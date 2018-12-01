import { observable } from "mobx";
import { observer } from "mobx-react";
import { configureDevtool } from "mobx-react-devtools";
import * as React from "react";
import { IAppModelProps } from "./app_model";
import { TodoListItem } from "./TodoListItem";

export const App = observer((props: IAppModelProps) => {
    const { model } = props;
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        model.input = e.currentTarget.value;
    }

    function handleAddTodo() {
        model.addTodo();
    }

    return (
        <div className="flex-col" style={{ width: "300px" }}>
            <div className="flex-row flex-center">
                <input className="flex-item-stretch" type="text" value={model.input} onChange={handleInputChange} />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <h3>To-Do</h3>
            {model.todos
                .filter(t => !t.done)
                .map(todo => (
                    <TodoListItem key={todo.id} model={todo} />
                ))}
            <h3>Done</h3>
            {model.todos
                .filter(t => t.done)
                .map(todo => (
                    <TodoListItem key={todo.id} model={todo} />
                ))}
        </div>
    );
});
