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
        modifiedList: async (row, key) => {
            let fn = modifiedList(row, key);
            console.log(await dispatch(fn),'fn');

            return await fn(dispatch);
        }
    }
}


let deviceColumn = [
    {
        title: "设备编号",
        dataIndex: "device_code",
        key: "device_code",
        width: "10%",
        editable: true,
        canSearch: true
    },
    {
        title: "类型",
        dataIndex: "class",
        key: "class",
        editable: true,
        canSearch: true
    },
    {
        title: "购买单位",
        dataIndex: "buyer",
        key: "buyer",
        editable: true,
        canSearch: true
    },
    {
        title: "品牌",
        dataIndex: "brand",
        key: "brand",
        editable: true,
        canSearch: true
    },
    {
        title: '型号',
        dataIndex: 'type',
        key: 'type',
        editable: true,
        canSearch: true
    },
    {
        title: '厂家编码',
        dataIndex: 'manufacturer_code',
        key: 'manufacturer_code',
        editable: true,
        canSearch: true
    }, {
        title: '购买金额',
        dataIndex: 'monetary',
        key: 'monetary',
        editable: true,
        canSearch: true
    }, {
        title: '用户名',
        dataIndex: 'User.name',
        key: 'User.name',

    },
    {
        title: "领用部门",
        dataIndex: "User.department.name",
        key: "User.department.name",

    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        editable: true,
        canSearch: true
    },
    {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        editable: true,
        canSearch: true
    }
]

export class SendAndReceiving extends React.Component {

    render() {
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