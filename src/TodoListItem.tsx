import { observer } from "mobx-react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import * as React from "react";
import { TodoModel } from "./app_model";

export interface ITodoListItemProps {
    model: TodoModel;
}

export const TodoListItem = observer((props: ITodoListItemProps) => {
    const { model } = props;
    return (
        <div className="flex-row flex-baseline">
            <Toggle checked={model.done} onChange={model.toggle} />
            <div style={{ marginLeft: 8 }} />
            <span>
                {model.id} - {model.text}
            </span>
            <div className="flex-item-stretch" />
            <IconButton
                style={{ backgroundColor: "red", color: "white" }}
                iconProps={{ iconName: "Delete" }}
                onClick={model.delete}
            />
        </div>
    );
});
