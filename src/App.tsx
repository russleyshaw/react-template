import React from "react";
import { Container, Typography, useTheme } from "@material-ui/core";

export default function App(): JSX.Element {
    const theme = useTheme();

    return (
        <Container maxWidth="xl">
            <Typography style={{ margin: theme.spacing(2) }}>Hello, World</Typography>
        </Container>
    );
}
