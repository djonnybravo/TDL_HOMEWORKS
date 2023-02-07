import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key:string] : Array<TaskType>
}


function App() {

     function removeTask(id: string, todolistID:string) {
         const tasks = tasksObj[todolistID]
        let filteredTasks = tasks.filter(t => t.id !== id);
         tasksObj[todolistID] = filteredTasks
        setTasks({...tasksObj});
    }

    function removeTodolist(todolistID: string) {
       let removedTDL = todolists.filter((tdl) => tdl.id !== todolistID)
        setTodolists(removedTDL)
        delete tasksObj[todolistID]
        setTasks({...tasksObj})


     }

    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false};
        const tasks = tasksObj[todolistID]
        let newTasks = [task, ...tasks];
        tasksObj[todolistID] = newTasks
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID:string) {
        const tasks = tasksObj[todolistID]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            tasksObj[todolistID] = tasks
            setTasks({...tasksObj})
            }


    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        const filteredTDL = todolists.find(tl => tl.id === todolistID)
        if (filteredTDL) {
            filteredTDL.filter = value
            setTodolists([...todolists])

        }
    }

    const tododolistId1 = v1()
    const tododolistId2 = v1()


    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: tododolistId1, title: "What to Learn", filter: 'active'},
        {id: tododolistId2, title: "What to Buy", filter: 'all'},

    ])

    const [tasksObj, setTasks] = useState<TaskStateType>({
        [tododolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [tododolistId2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    })

const addTodolist = (title:string) => {
         let todolist: TodolistType = {
             id: v1(),
             title: title,
             filter: "all"
         }
        setTodolists([todolist, ...todolists])
        setTasks({...tasksObj, [todolist.id]: []})
    }
    return (

        <div className="App">

            <AddItemForm addItem={addTodolist}/>

            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }


                    return <Todolist title={tl.title}
                                     key={tl.id}
                                     id={tl.id}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     removeTodolist={removeTodolist}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                    />
                })
            }


        </div>
    );
}

export default App;
