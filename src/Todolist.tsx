import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    filter: (filter: FilterType) => void
    add: (title: string) => void
}

export function Todolist(props: TodoListPropsType) {
    const [title, setTitle] = useState('')

    const taskItemsList = props.tasks.length ?
        props.tasks.map(el => {
            return (
                <li key={el.id}>
                    <input type='checkbox' checked={el.isDone}/>
                    <span>{el.title}</span>
                    <button onClick={() => props.removeTask(el.id)}>x</button>
                </li>
            )
        }) : <span>Your taskList is empty :(</span>

    const onClickAddTask = () => {
        props.add(title)
        setTitle('')
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'  && e.ctrlKey === true) {
            onClickAddTask()
        }
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const getChangeFilterHandler = (filter: FilterType): () => void => {
        return () => props.filter(filter)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}/>
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {taskItemsList}
            </ul>
            <div>
                <button onClick={getChangeFilterHandler('all')}>All</button>
                <button onClick={getChangeFilterHandler('active')}>Active</button>
                <button onClick={getChangeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}