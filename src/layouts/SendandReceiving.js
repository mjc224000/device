import React from "react";
import {connect} from 'react-redux';
import {CorePanel} from "../components/CorePanel";
import {CoreSearchAndEditTable} from "../components/CoreSearchAndEditTable";
import {getOperations} from "../ado";
import {modifiedList} from "../redux/actionCreators";

function mapStateToProps(state) {
    return {
        list: state.deviceList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        modifiedList: (row, key) => dispatch(modifiedList(row, key))
    }
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
let deviceColumn = [
    {
        title: "设备编号",
        dataIndex: "device_code",
        key: "device_code",
        width: "10%",
        editable: true,
        canSearch: true
    }
]

export class SendAndReceiving extends React.Component {

    render() {
        console.log(this.props.modifiedList, 'this.props.modifiedList');

        return (
            <div style={{width: "80%", margin: " 100px auto"}}>
                <CorePanel desc={"设备信息列表"} title={"列表"}>
                    <CoreSearchAndEditTable dataSource={this.props.list} onSave={this.props.modifiedList}
                                            columns={deviceColumn}/>
                </CorePanel>
            </div>


        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendAndReceiving);