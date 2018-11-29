import * as Immutable from "immutable";
import * as React from "react";
import { useState } from "react";

export interface ITodo {
    id: number;
    text: string;
    done: boolean;
}

export interface ITodoListItemProps extends ITodo {
    delete(): void;
    toggle(): void;
}

const TodoListItem = (props: ITodoListItemProps) => (
    <div className="flex-row flex-center">
        <input type="checkbox" checked={props.done} onChange={props.toggle} />
        <span>
            {props.id} - {props.text}
        </span>
        <div className="flex-item-stretch" />
        <button onClick={props.delete}>x</button>
    </div>
);

let nextTodoId = 1;
export const App = () => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState(Immutable.List<ITodo>());

    function onAddTodo() {
        const todoId = nextTodoId;
        nextTodoId++;
        setTodos(todos.push({ id: todoId, text: input, done: false }));
        setInput("");
    }

    function toggleTodo(todoId: number) {
        const entry = todos.findEntry(t => t.id === todoId);
        if (entry == null) return;
        const [idx, todo] = entry;
        todo.done = !todo.done;
        setTodos(todos.update(idx, () => todo));
    }

    function deleteTodo(todoId: number) {
        const idx = todos.findIndex(t => t.id === todoId);
        if (idx === -1) return;
        setTodos(todos.remove(idx));
    }

    function onInputChange(e: React.FormEvent<HTMLInputElement>) {
        setInput(e.currentTarget.value);
    }

    return (
        <div className="flex-col" style={{ width: "300px" }}>
            <div className="flex-row flex-center">
                <input className="flex-item-stretch" type="text" value={input} onChange={onInputChange} />
                <button onClick={onAddTodo}>Add</button>
            </div>
            <h3>To-Do</h3>
            {todos
                .filter(t => !t.done)
                .map(todo => (
                    <TodoListItem
                        key={todo.id}
                        {...todo}
                        toggle={() => toggleTodo(todo.id)}
                        delete={() => deleteTodo(todo.id)}
                    />
                ))}
            <h3>Done</h3>
            {todos
                .filter(t => t.done)
                .map(todo => (
                    <TodoListItem
                        key={todo.id}
                        {...todo}
                        toggle={() => toggleTodo(todo.id)}
                        delete={() => deleteTodo(todo.id)}
                    />
                ))}
        </div>
    );
};
