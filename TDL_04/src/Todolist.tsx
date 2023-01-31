import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string ) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id);
            setTitle("");

        }else {
            setError("Filed is required")
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }
    let buttonActiveStyle = ""
    const onAllClickHandler = () => {props.changeFilter("all", props.id)
        buttonActiveStyle = "a"
    };
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolistClickHandler = () => props.removeTodolist(props.id)
    return <div>
        <h3>{props.title}</h3><button onClick={removeTodolistClickHandler}>X</button>

        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error_message">Field is required</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const removeTaskClickHandler = () => props.removeTask(t.id, props.id)

                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={ removeTaskClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={ onAllClickHandler } className={props.filter === "all" ? "active-filter" : ""}>All</button>
            <button onClick={ onActiveClickHandler } className={props.filter === "active" ? "active-filter" : ""}>Active</button>
            <button onClick={ onCompletedClickHandler } className={props.filter === "completed" ? "active-filter" : ""}>Completed</button>
        </div>
    </div>
}
