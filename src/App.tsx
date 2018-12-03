import { observer } from "mobx-react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as React from "react";
import { IAppModelProps } from "./app_model";
import { TodoListItem } from "./TodoListItem";

const AddIconSubmitButton = () => <IconButton iconProps={{ iconName: "Add" }} primary type="submit" />;

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

    const unfinished = model.todos.filter(t => !t.done);

    const finished = model.todos.filter(t => t.done);

    return (
        <div className="flex-row flex-justify-center">
            <div className="flex-col" style={{ padding: 16, margin: 16, border: "1px black solid", flexBasis: 500 }}>
                <Label>New Todo:</Label>
                <form className="flex-row flex-align-center flex-item-stretch" onSubmit={handleAddTodo}>
                    <TextField
                        className="flex-item-stretch"
                        onChange={handleInputChange}
                        value={model.input}
                        placeholder={model.placeholder}
                    />
                    <AddIconSubmitButton />
                </form>
                {unfinished.length === 0 ? null : <Label>Unfinished</Label>}
                {unfinished.map(todo => (
                    <TodoListItem key={todo.id} model={todo} />
                ))}
                {finished.length === 0 ? null : <Label hidden={finished.length === 0}>Finished</Label>}
                {finished.map(todo => (
                    <TodoListItem key={todo.id} model={todo} />
                ))}
            </div>
        </div>
    );
});
