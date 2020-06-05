import {AppBar, Toolbar, Typography} from "@material-ui/core";
import React from 'react';

export default function Header() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">React Hooks Forms</Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
