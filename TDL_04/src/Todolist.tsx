import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export  type TaskType = {
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
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (id:string, title: string, todolistID : string) => void
    changeTodolistTitle: (title: string, todolistID : string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    let buttonActiveStyle = ""
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
        buttonActiveStyle = "a"
    };
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolistClickHandler = () => props.removeTodolist(props.id)
    const onChangeTodolistTitle = (title:string) => {
        props.changeTodolistTitle(title, props.id)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitle}/></h3>
        <button onClick={removeTodolistClickHandler}>X</button>

        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {

                    const removeTaskClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeTaskTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTaskTitle}/>
                        <button onClick={removeTaskClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler} className={props.filter === "all" ? "active-filter" : ""}>All</button>
            <button onClick={onActiveClickHandler} className={props.filter === "active" ? "active-filter" : ""}>Active
            </button>
            <button onClick={onCompletedClickHandler}
                    className={props.filter === "completed" ? "active-filter" : ""}>Completed
            </button>
        </div>
    </div>
}



