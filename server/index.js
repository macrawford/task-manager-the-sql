const express = require('express');
const db = require('../database/config/db');

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.static('public'))
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/data', (req, res) => {
    console.log('running the database call')
    db.getTodos()
    .then(rows => res.send(rows))
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

app.post('/api/data/post', (req, res) => {
    console.log('in app.post on server/index.js')
    console.log('req.data: ', req.data)
    console.log('req.params: ', req.params)
    console.log('req.body: ', req.body)
    db.addTodo(req.body)
    .then((res) => {
        console.log('response: ', res)
    })
    .catch(err => {
        console.log('error in server/index.js post request: ', err)
    })
})


app.get('/', (req, res) => {
    res.send('TEST')
})

app.listen(PORT, () => {
    console.log(`App running on localhost:${PORT}`)
})