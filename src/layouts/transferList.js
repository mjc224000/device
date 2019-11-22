import React from "react";
import {FilerAndSearchTable} from '../components/FilerAndSearchTable'
import {getAllOperations} from "../ado";
import {duplicateList} from "../utils";
import {teal} from "@material-ui/core/colors";

export class TransferTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    async componentDidMount() {
        let ret = await getAllOperations();
        let data = ret.data;
        data.forEach(item => {
            item['key'] = item['id']
            item['username'] = item["User.name"]
        })
        console.log(data);
        this.setState({data});
    }

    render() {
        const {data} = this.state;
        const columns = [{
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
            ellipsis: true,
            sorter: (a, b) => {
                return a['username'] - b['username']
            },
            onFilter: (value, record) => {
                return record['username'].indexOf(value) > -1;
            },
            filters: duplicateList(data)("username").map(function (item) {
                return {text: item, value: item};
            }),
            render(record) {
                return record === "未分配" ? "管理员" : record;
            }
        },
            {
                title: "操作",
                dataIndex: "action_type",
                key: "action_type",
                render(text, record) {
                    if (record['User.name'] === "未分配") {
                        return text === 'send' ? '发出' : "收回"
                    }
                    return text === 'send' ? "归还" : "领用"
                }
            }, {
                title: "操作时间",
                dataIndex: "collection_date",
                key: "collection_date",
            }, {
                title: "类型",
                dataIndex: 'device.class',
                key: 'device.class',
            },
            {
                title: "品牌",
                dataIndex: "device.brand",
                key: "device.brand",
            }, {
                title: "型号",
                dataIndex: "device.type",
                key: "device.type",
            },
            {
                title: "设备编号",
                dataIndex: "device.device_code",
                key: "device.device_code"
            },
            {
                title: "部门",
                dataIndex: "User.department.name",
                key: "User.department.name",
            }
        ]
        return (
            <div>
                <FilerAndSearchTable data={data} columns={columns}/>
            </div>
        )
    }
}