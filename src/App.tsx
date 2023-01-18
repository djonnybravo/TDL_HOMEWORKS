import React, {useEffect, useState} from 'react';
import './App.css';
import Todolist, {taskType} from "./Todolist";
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListTitle_1: string = "What to learn"


    const [task, setTasks] = useState<Array<taskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    const removeTask = (taskId: string) => {
        setTasks(task.filter(task => task.id !== taskId))

    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false }
        let newTasks = [newTask, ...task]
        setTasks(newTasks)
    }
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (filter:FilterValuesType) => {
        setFilter(filter)
    }

    useEffect( () => {
        console.log(task)
    }, [task,])

    const getFilterTasksForRender = (tasks: Array<taskType>, filter: FilterValuesType): Array<taskType> => {

         switch (filter) {
            case "active":
                return tasks.filter(task => task.isDone === false)
            case "completed":
                return tasks.filter(task => task.isDone === true)
            default:
                return tasks
        }


    }
    const filteredTasksForRender = getFilterTasksForRender(task, filter)


    return (
        <div className="App">
            <Todolist
                title={todoListTitle_1}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask = {addTask}
            />
        </div>
    );
}

export default App;
