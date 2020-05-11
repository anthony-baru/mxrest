const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = process.env.port || 8080;
//body parser
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type,Authorization');
    next();
})

// routes
const feedRoutes = require('./routes/feed');
app.get('/', (req, res) => res.send('Hello World!'))

app.use('/feed', feedRoutes);

app.listen(port, () => console.log(`app listening on port ${port}!`))