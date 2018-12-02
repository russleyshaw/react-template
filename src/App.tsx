import { observer } from "mobx-react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import { IAppModelProps } from "./app_model";
import { TodoListItem } from "./TodoListItem";

export const App = observer((props: IAppModelProps) => {
    const { model } = props;
    function handleInputChange(e: any, newValue?: string) {
        if (newValue == null) return;
        model.input = newValue;
    }

    function handleAddTodo(e: React.FormEvent) {
        e.preventDefault();
        model.addTodo();
    }

    return (
        <div className="flex-col flex-item-stretch" style={{ padding: 16, margin: 16, border: "1px black solid" }}>
            <Label>New Todo:</Label>
            <form className="flex-row flex-center flex-item-stretch" onSubmit={handleAddTodo}>
                <TextField
                    className="flex-item-stretch"
                    onChange={handleInputChange}
                    value={model.input}
                    placeholder="Enter New Todo"
                />
                <IconButton iconProps={{ iconName: "Add" }} type="submit">
                    Add
                </IconButton>
            </form>
            <Label>To-Do</Label>
            {model.todos
                .filter(t => !t.done)
                .map(todo => (
                    <TodoListItem key={todo.id} model={todo} />
                ))}
            <Label>Done</Label>
            {model.todos
                .filter(t => t.done)
                .map(todo => (
                    <TodoListItem key={todo.id} model={todo} />
                ))}
        </div>
    );
});
