import React from "react";

import {CorePanel} from "../components/CorePanel";
import {CoreSearchAndEditTable} from "../components/CoreSearchAndEditTable";

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

function onSave(props) {
    console.log('outer', props)
}

let columns = [
    {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
        canSearch: true,
    },
    {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
    },
    {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        editable: true,
    },
];

export class SendAndReceiving extends React.Component {
    render() {
        return (

            <div style={{width: "80%", margin: " 100px auto"}}>
                <CorePanel desc={"aaaa"} title={"ttttt"}>
                    <CoreSearchAndEditTable dataSource={data} onSave={onSave} columns={columns}/>
                </CorePanel>
            </div>


        )
    }
}