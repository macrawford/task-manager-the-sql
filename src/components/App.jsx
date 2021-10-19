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
        sliced.push(input);
        setTodos(sliced);
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
                            <div>
                                {todo}
                            </div>
                            <button>
                                Mark completed
                            </button>
                            <button>
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