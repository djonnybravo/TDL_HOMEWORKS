import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (title:string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, SetEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)
    let [error, setError] = useState<string | null>(null)

    const activateEditMode = () => SetEditMode(true)
    const activateViewMode = () => {
        SetEditMode(false)
        props.onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    return editMode
        ? <TextField value={title} onBlur={activateViewMode} autoFocus onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
}