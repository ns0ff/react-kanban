import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    // BLL
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'JS/ES6', isDone: true},
        {id: 4, title: 'React', isDone: false},
    ])

    const removeTask = (taskId: number) => {
        const updatedTasks = tasks.filter(el => el.id !== taskId)
        setTasks(updatedTasks)
    }

    const [filter, setFilter] = useState('all')

    const filterFn = (filterName: FilterType) => {
        setFilter(filterName)
    }

    let tasksForRender;
    switch (filter) {
        case 'completed':
            tasksForRender = tasks.filter((el: TasksType) => el.isDone === true)
            break
        case 'active':
            tasksForRender = tasks.filter((el:TasksType) => el.isDone === false)
            break
        default:
            tasksForRender = tasks
    }

    // UI
    return (
        <div className="App">
            <Todolist title='what to learn' tasks={tasksForRender} removeTask={removeTask} filter={filterFn}/>
            {/*<Todolist title='another title' tasks={tasks2} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;

