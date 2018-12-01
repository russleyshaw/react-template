import DevTools from "mobx-react-devtools";
import * as React from "react";
import { render } from "react-dom";

import { App } from "./App";
import { AppModel } from "./app_model";

import "./style/index.scss";

const model = new AppModel();

render(
    <>
        {process.env.NODE_ENV === "production" ? null : <DevTools />}
        <div>Hello, World</div>
    </>,
    document.getElementById("main-app")
);
