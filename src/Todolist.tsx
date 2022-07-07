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
    changeStatus: (taskId: string, isDone: boolean) => void
    filterValue: FilterType
}

export function Todolist(props: TodoListPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)


    const taskItemsList = props.tasks.length ?
        props.tasks.map(el => {
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(el.id, e.currentTarget.checked)
            return (
                <li key={el.id} style={{listStyle: 'none'}}>
                    <input onChange={changeStatus} type='checkbox' checked={el.isDone}/>
                    <span className={el.isDone ? 'task isDone' : 'task'}>{el.title}</span>
                    <button onClick={() => props.removeTask(el.id)}>x</button>
                </li>
            )
        }) : <span>Your taskList is empty :(</span>

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.add(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'  && e.ctrlKey === true) {
            onClickAddTask()
        }
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }

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
                    onKeyDown={onKeyDownAddTask}
                    className={error ? "error" : ''}/>
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{color: 'red'}}>Title is required!</div>}
            </div>
            <ul>
                {taskItemsList}
            </ul>
            <div>
                <button
                    className={props.filterValue === 'all' ? 'active' : ''}
                    onClick={getChangeFilterHandler('all')}
                >All</button>
                <button
                    className={props.filterValue === 'active' ? 'active' : ''}
                    onClick={getChangeFilterHandler('active')}
                >Active</button>
                <button
                    className={props.filterValue === 'completed' ? 'active' : ''}
                    onClick={getChangeFilterHandler('completed')}
                >Completed</button>
            </div>
        </div>
    )
}