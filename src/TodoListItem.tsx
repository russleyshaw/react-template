import { observer } from "mobx-react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import {} from "office-ui-fabric-react/lib/PersonaCoin";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import * as React from "react";
import { TodoModel } from "./app_model";
export interface ITodoListItemProps {
    model: TodoModel;
}

const TrashIconButton = React.memo((props: { onClick: () => void }) => (
    <IconButton
        style={{ backgroundColor: "red", color: "white" }}
        iconProps={{ iconName: "Delete" }}
        onClick={props.onClick}
    />
));

export const TodoListItem = observer((props: ITodoListItemProps) => {
    const { model } = props;
    return (
        <div className="flex-row flex-align-baseline">
            <Toggle checked={model.done} onChange={model.toggle} />
            <div style={{ marginLeft: 8 }} />
            <span>{model.text}</span>
            <div className="flex-item-stretch" />
            <TrashIconButton onClick={model.delete} />
        </div>
    );
});
