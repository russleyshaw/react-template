import { observable } from "mobx";
import { randomChoice } from "./random";

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

const PLACEHOLDERS = [
    "Check the mail",
    "Wash the dishes",
    "Walk the dog",
    "Join the Kwiwk discord",
    "Add Russley on KeyBase",
    "Switch to Duck Duck Go",
    "Switch to Firefox",
    "Install 1.1.1.1 on Android",
    "Pass out",
    "Learn TypeScript",
    "Complain about TypeScript"
];

export class AppModel {
    @observable todos: TodoModel[] = [];
    @observable input: string = "";
    @observable placeholder = randomChoice(PLACEHOLDERS);
    private nextId = 1;

    constructor() {
        setInterval(() => {
            this.placeholder = randomChoice(PLACEHOLDERS);
        }, 5000);
    }

    private getNextId() {
        const id = this.nextId;
        this.nextId++;
        return id;
    }

    addTodo() {
        const input = this.input.trim();
        if (input === "") {
            return;
        }
        const id = this.getNextId();
        const todo = new TodoModel(id, input, () => this.deleteTodo(id));
        this.input = "";
        this.todos.push(todo);
    }

    private deleteTodo(id: number): void {
        const idx = this.todos.findIndex(t => t.id === id);
        if (idx === -1) return;

        this.todos.splice(idx, 1);
    }
}

export interface IAppModelProps {
    model: AppModel;
}
