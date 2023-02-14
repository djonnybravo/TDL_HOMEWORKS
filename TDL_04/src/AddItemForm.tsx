import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Icon, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle("");

        } else {
            setError("Filed is required")
        }

    }

    return (
        <div>

            <TextField
                       value={title}

                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />

            <IconButton onClick={addTask}>
                <ControlPoint color={"primary"}/>
            </IconButton>
        </div>
    )

}