import { initializeIcons } from "@uifabric/icons";
import DevTools from "mobx-react-devtools";
import * as React from "react";
import { render } from "react-dom";

import { App } from "./App";
import { AppModel } from "./app_model";

import "./style/index.scss";

initializeIcons();
const model = new AppModel();

render(
    <>
        {process.env.NODE_ENV === "production" ? null : <DevTools />}
        <App model={model} />
    </>,
    document.getElementById("main-app")
);
