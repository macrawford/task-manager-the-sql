const express = require('express');
const db = require('../database/config/db');

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.static('public'))

app.get('api/data/', (req, res) => {
    console.log('running the database call')
    db.getTodos()
    .then(rows => res.send(rows))
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

app.listen(PORT, () => {
    console.log(`App running on localhost:${PORT}`)
})