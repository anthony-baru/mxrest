const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = process.env.port || 8080;
const cors = require('cors');
const mongoose = require('mongoose');
//body parser
app.use(bodyParser.json());
app.use(cors())
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

mongoose
    .connect('mongodb://localhost:27017/messages?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        app.listen(port, () => console.log(`app listening on port ${port}!`))
    })
    .catch(err => { console.log(err) })