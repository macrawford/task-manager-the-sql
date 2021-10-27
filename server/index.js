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
        res.status(404).send('Resource not found');
    })
})

app.post('/api/data', (req, res) => {
    console.log('in app.post on server/index.js')
    console.log('req.body: ', req.body)
    db.addTodo(req.body)
    .then(() => {
        res.sendStatus(201)
    })
    .catch(err => {
        console.log('error in server/index.js post request: ', err)
        res.sendStatus(404)
    })
})

app.delete('/api/data/:id', (req, res) => {
    console.log('in app.delete on server/index.js')
    const { id } = req.params;
    console.log('id: ', id)
    db.deleteTodo(id)
    .then(() => {
        res.sendStatus(204)
    })
    .catch(err => {
        console.log('error in server/index.js delete request: ', err)
        res.sendStatus(404)
    })
})

app.patch('/api/data/:id', (req, res) => {
    const { id } = req.params
    const newCompleted = !req.body.completed
    console.log('req.body in patch: ', req.body)
    console.log('req.params in patch: ', req.params)
    db.toggleCompleted(id, newCompleted)
    .then(() => {
        res.sendStatus(201)
    })
    .catch(err => {
        console.log('error in server/index.js patch request: ', err)
        res.sendStatus(404)
    })
})

app.listen(PORT, () => {
    console.log(`App running on localhost:${PORT}`)
})