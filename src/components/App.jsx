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
        console.log('input: ', input)
    }
    const handleSubmit = (e) => {
        // e.preventDefault();
        // var sliced = todos.slice();
        // sliced.push({text: input, completed: false});
        // setTodos(sliced);
        e.preventDefault();
        var newTodo = {text: input, completed: false};
        addTodo(newTodo);


    }
    const deleteTodo = (index) => {
        var sliced = todos.slice();
        sliced.splice(index, 1);
        setTodos(sliced);
    }
    const toggleCompleted = (index) => {
        var sliced = todos.slice();
        sliced[index].completed = !sliced[index].completed
        setTodos(sliced)
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
        axios.post('/api/data/post', todo)
            .then((response) => {
                fetchTodos();
            })
            .catch((err) => {
                console.log('error in App.jsx post request: ', err);
            })
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
                            <button onClick={() => toggleCompleted(index)}>
                                Mark completed
                            </button>
                            <button onClick={() => deleteTodo(index)}>
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