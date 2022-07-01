import React from "react";
import {FilterType} from "./App";

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: number) => void
    filter: (filter: FilterType) => void
}

export function Todolist(props: TodoListPropsType) {
    const taskItemsList = props.tasks.length ?
        props.tasks.map( el => {
        return (
            <li key={el.id}>
                <input type='checkbox' checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={() => props.removeTask(el.id)}>x</button>
            </li>
        )
    }) : <span>Your taskList is empty</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskItemsList}
            </ul>
            <div>
                <button onClick={() => props.filter('all')}>All</button>
                <button onClick={() => props.filter('active')}>Active</button>
                <button onClick={() => props.filter('completed')}>Completed</button>
            </div>
        </div>
    )
}