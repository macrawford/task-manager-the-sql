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

const deleteTodo = (id) => {
    var query = `delete from todotable where id=${id}`;
    return pool.query(query)
    .then(() => {
        console.log('successful delete request');
    })
    .catch((err) => {
        throw err;
    })
}

const toggleCompleted = (id, newCompleted) => {
    var query = `update todotable set completed = ${newCompleted} where id=${id}`
    return pool.query(query)
    .then(() => {
        console.log('successful patch request')
    })
    .catch(err => {
        throw err;
    })
}

module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    toggleCompleted
}