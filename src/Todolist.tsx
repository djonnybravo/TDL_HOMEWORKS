import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {green} from "@material-ui/core/colors";

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
        <div>
            <span><EditableSpan title={props.title} onChange={onChangeTodolistTitle}/></span>
            <IconButton onClick={removeTodolistClickHandler}>
                <DeleteIcon fontSize="medium" />
            </IconButton>

        </div>


        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {

                    const removeTaskClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeTaskTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox  checked={t.isDone} onChange={onChangeHandler} />
                        <EditableSpan title={t.title} onChange={onChangeTaskTitle}/>
                        <IconButton onClick={removeTaskClickHandler} aria-label="delete" size="small">
                            <DeleteIcon fontSize="small" color={t.isDone ? "secondary" : "primary"}/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button
                onClick={onAllClickHandler}
                variant={props.filter === "all" ? "contained" : "outlined"}
                color={props.filter === "all" ? "primary" : "default"}

            >All</Button>
            <Button  onClick={onActiveClickHandler} variant={props.filter === "active" ? "contained" : "outlined"}
                     color={props.filter === "active" ? "primary" : "default"}
            >Active
            </Button>
            <Button  onClick={onCompletedClickHandler}
                   variant={props.filter === "completed" ? "contained" : "outlined"}
                     color={props.filter === "completed" ? "secondary" : "default"}
            >Completed
            </Button>
        </div>
    </div>
}



