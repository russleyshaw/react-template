import DevTools from "mobx-react-devtools";
import * as React from "react";
import { render } from "react-dom";

import "./style";

render(
    <>
        {process.env.NODE_ENV === "production" ? null : <DevTools />}
        <div>Hello, World</div>
    </>,
    document.getElementById("main-app")
);
