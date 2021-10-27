import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
    const [input, setInput] = React.useState('');
    const [todos, setTodos] = React.useState([]);
    useEffect(() => {
        fetchTodos();
    }, []);
    const handleChange = (e) => {
        setInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var newTodo = {text: input, completed: false};
        addTodo(newTodo);
    }
    const fetchTodos = () => {
        console.log('running fetchTodos function from App.jsx!!!')
        axios.get('/api/data')
            .then(({data}) => {
                console.log('data: ', data);
                setTodos(data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    }
    const addTodo = (todo) => {
        console.log('running addTodo function from App.jsx!')
        console.log('todo in App.jsx: ', todo.text)
        var text = todo.text;
        var completed = todo.completed;
        axios.post('/api/data', todo)
            .then((response) => {
                console.log('response in App.jsx addTodo')
                fetchTodos();
            })
            .catch((err) => {
                console.log('error in App.jsx post request: ', err);
            })
    }
    const deleteTodo = (id) => {
        // var sliced = todos.slice();
        // sliced.splice(index, 1);
        // setTodos(sliced);
        axios.delete('/api/data/' + id)
            .then((response) => {
                fetchTodos();
            })
            .catch((err) => {
                console.log('error in App.jsx delete request: ', err)
            })
    }
    const toggleCompleted = (todo) => {
        console.log('todo: ', todo)
        axios.patch('/api/data/' + todo.id, todo)
            .then((response) => {
                fetchTodos();
            })
            .catch((err) => {
                console.log('error in App.jsx patch request')
            })
        // var sliced = todos.slice();
        // sliced[index].completed = !sliced[index].completed
        // setTodos(sliced)
    }
    return (
        <div>
            <div>
                To-Do List
            </div>
            <form>
                <input onChange={handleChange} placeholder={'Add to-do'}></input>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <div>
                {todos.map((todo, index) => {
                    return(
                        <div key={index}>
                            {todo.completed ? <div>completed</div> : <div>{todo.text}</div>}
                            <button onClick={() => toggleCompleted(todo)}>
                                Mark completed
                            </button>
                            <button onClick={() => deleteTodo(todo.id)}>
                                Delete
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default App;