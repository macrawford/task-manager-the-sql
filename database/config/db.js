const { Pool } = require('pg');

const pool = new Pool({
  user: 'matthewcrawford',
  database: 'todoapp',
  password: ''
})

pool.connect();

const getTodos = () => {
    var query = `select * from todotable`;
    return pool.query(query)
    .then(({rows}) => {
        return rows
    })
    .catch((err) => {
        throw err
    })
}

const addTodo = (todo) => {
    console.log('todo in db.js: ', todo)
    // Need single quotes around todo.text
    var query = `insert into todotable (text, completed) values ('${todo.text}', ${todo.completed})`;
    return pool.query(query)
    .then(() => {
        console.log('successful POST request')
    })
    .catch((err) => {
        throw err
    })
}

module.exports = {
    getTodos,
    addTodo
}