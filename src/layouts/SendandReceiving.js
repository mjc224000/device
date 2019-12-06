import React from "react";

import {CorePanel} from "../components/CorePanel";
import {CoreSearchAndEditTable} from "../components/CoreSearchAndEditTable";


export class SendAndReceiving extends React.Component {
    render() {
        const column = []
        return (

            <div style={{width: "80%", margin: " 100px auto"}}>
                <CorePanel desc={"aaaa"} title={"ttttt"}>
                <CoreSearchAndEditTable/>
                </CorePanel>
            </div>


        )
    }
}