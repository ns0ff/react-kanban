import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    let tasks1 = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'JS', isDone: true},
        {id: 4, title: 'React', isDone: false},
    ]

    let tasks2 = [
        {id: 1, title: 'aaa', isDone: true},
        {id: 2, title: 'bbb', isDone: false},
        {id: 3, title: 'ccc', isDone: true},
    ]
    return (
        <div className="App">
            <Todolist title='what to learn' tasks={tasks1}/>
            <Todolist title='another title' tasks={tasks2}/>
        </div>
    );
}

export default App;

