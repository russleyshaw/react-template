import * as React from "react";
import { observer } from "mobx-react";
import { hot } from "react-hot-loader/root";

import AppView from "./AppView";

const RootView = observer(() => {
    return <AppView />;
});

export default hot(RootView);
