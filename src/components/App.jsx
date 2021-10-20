import React, { useState } from 'react';

function App() {
    const [input, setInput] = React.useState('');
    const [todos, setTodos] = React.useState([]);
    const handleChange = (e) => {
        setInput(e.target.value);
        console.log('input: ', input)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var sliced = todos.slice();
        sliced.push({text: input, completed: false});
        setTodos(sliced);
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