const express = require('express');
const db = require('../database/config/db');

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.static('public'))

app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM todos", (err, results) => {
        if (err) {
            console.log('error: ', err)
        }
        res.send(results)
    })
})

app.post("api/create", (req, res) => {
    const text = req.body.text;
    const completed = req.body.completed;
    db.query("INSERT INTO posts (text, completed) VALUES (?, ?)", [text, completed], (err, results) => {
        if (err) {
            console.log('error: ', err)
        }
        console.log(results)
    })
})

app.listen(PORT, () => {
    console.log(`App running on localhost:${PORT}`)
})