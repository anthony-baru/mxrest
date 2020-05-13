const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.port || 8080;
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();

//for handling file uploads
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


//body parser
app.use(bodyParser.json());
//file upload config
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));
//cors middleware
app.use(cors())
//setting headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
    next();
})

// routes
const feedRoutes = require('./routes/feed');
app.get('/', (req, res) => res.json({ 'msg': 'Hello World!' }))

app.use('/feed', feedRoutes);

//error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    res.status(status).json({ message: message, statusCode: status });
});

mongoose
    .connect('mongodb://localhost:27017/messages?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        app.listen(port, () => console.log(`app listening on port ${port}!`))
    })
    .catch(err => { console.log(err) })