const express = require('express')
const app = express()
const port = process.env.port || 8080

// routes
const feedRoutes = require('./routes/feed');

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/feed', feedRoutes);

app.listen(port, () => console.log(`app listening on port ${port}!`))