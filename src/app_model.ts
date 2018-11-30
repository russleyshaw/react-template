import { observable } from "mobx";
import { noop } from "./util";

export class TodoModel {
    readonly id: number;
    @observable text: string;
    @observable done: boolean = false;
    delete: () => void;

    constructor(id: number, text: string, onDelete: () => void) {
        this.id = id;
        this.text = text;
        this.delete = onDelete;
    }
    toggle = () => {
        this.done = !this.done;
    };
}

export class AppModel {
    @observable todos: TodoModel[] = [];
    @observable input: string = "";
    private nextId = 1;

    private getNextId() {
        const id = this.nextId;
        this.nextId++;
        return id;
    }

    addTodo(): TodoModel {
        const id = this.getNextId();
        const todo = new TodoModel(id, this.input, () => this.deleteTodo(id));
        this.todos.push(todo);

        return todo;
    }

    private deleteTodo(id: number): void {
        const idx = this.todos.findIndex(t => t.id === id);
        if (idx === -1) return;

        this.todos.splice(idx);
    }
}

export interface IAppModelProps {
    model: AppModel;
}
