import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    // BLL
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS/ES6', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])

    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter(el => el.id !== taskId)
        setTasks(updatedTasks)
    }

    const addTask = (title: string) => {
        if (title !== '') {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])}
    }

    const [filter, setFilter] = useState('all')

    const filterFn = (filterName: FilterType) => {
        setFilter(filterName)
    }

    let tasksForRender;
    switch (filter) {
        case 'completed':
            tasksForRender = tasks.filter((el: TasksType) => el.isDone)
            break
        case 'active':
            tasksForRender = tasks.filter((el:TasksType) => !el.isDone)
            break
        default:
            tasksForRender = tasks
    }

    // UI
    return (
        <div className="App">
            <Todolist
                title='what to learn'
                tasks={tasksForRender}
                removeTask={removeTask}
                filter={filterFn}
                add={addTask}/>
            {/*<Todolist title='another title' tasks={tasks2} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;

