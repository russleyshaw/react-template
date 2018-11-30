import DevTools from "mobx-react-devtools";
import { configureDevtool } from "mobx-react-devtools";
import * as React from "react";
import { render } from "react-dom";

import { App } from "./App";
import { AppModel } from "./app_model";

import "./style/index.scss";

configureDevtool({
    updatesEnabled: true,
    logFilter: change => change.type === "reaction"
});

const model = new AppModel();

render(
    <>
        <DevTools />
        <App model={model} />
    </>,
    document.getElementById("main-app")
);
