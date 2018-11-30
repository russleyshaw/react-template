import { observer } from "mobx-react";
import * as React from "react";
import { TodoModel } from "./app_model";

export interface ITodoListItemProps {
    model: TodoModel;
}

export const TodoListItem = observer((props: ITodoListItemProps) => {
    const { model } = props;
    return (
        <div className="flex-row flex-center">
            <input type="checkbox" checked={model.done} onChange={model.toggle} />
            <span>
                {model.id} - {model.text}
            </span>
            <div className="flex-item-stretch" />
            <button onClick={model.delete}>x</button>
        </div>
    );
});
