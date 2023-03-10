import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}
export type ActionType = RemoveTodolistActionType|AddTodolistActionType|ChangeTodolistTitleActionType|ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" : {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST" : {
            return [...state, {id: v1(), title: action.title, filter: "all"}]
        }
        case "CHANGE-TODOLIST-TITLE" : {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title

            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER" : {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter

            }
            return [...state]
        }

        default:
            throw new Error("I dont understand this action type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (newTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: newTitle}
}
export const ChangeTitleTodolistAC = (newTitle: string, todolistId: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title:newTitle}
}
export const ChangeFilterTodolistAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}
}

