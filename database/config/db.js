const { Pool } = require('pg');

const pool = new Pool({
  user: 'matthewcrawford',
  database: 'todoapp',
  password: ''
})

pool.connect();

const getTodos = () => {
    var query = `select * from sampledata`;
    return pool.query(query)
    .then(({rows}) => {
        return rows
    })
    .catch((err) => {
        throw err
    })
}

module.exports = {
    getTodos
}