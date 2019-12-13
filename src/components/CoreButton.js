import React from "react";
import Button from '@material-ui/core/Button';
import {func} from "prop-types";

export function CoreButton(props) {
    return <Button
        type="primary"
        onClick={props.onClick}
        icon="search"
        size="small"
        style={{

            width: 90, marginRight: 8,
            background: "linear-gradient(60deg, rgb(171, 71, 188), rgb(142, 36, 170))",
            color: "white",
            ...props.style,
        }}
    >
        {props.children}
    </Button>
}

CoreButton.propTypes = {
    onClick: func
}