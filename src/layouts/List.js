import React from "react";
import {Table, Input, Button, Icon, Breadcrumb, Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import {Link, Switch, Route} from "react-router-dom";
import {CoreList} from '../components/TransferList';
import {getDeviceList} from "../redux/actionCreators";
import {connect} from 'react-redux';
import {getOperations} from "../ado";

function mapStateToProps(state) {
    return {
        list: state.deviceList
    }
}

let map = [];
map.push("");

class List extends React.Component {
    state = {
        searchText: '',
        isAll: true,
        isModalShow: false,
        operList: []
    };
    handleCancel = () => {
        this.setState({isModalShow: false})
    }
    handleModalConfirm = () => {
        this.handleCancel();
    }
    handleModalShow = async (record) => {
        let recordId = record['id'];
        let ret = await getOperations(recordId);
        let data = ret.data;
        if (!data.length) {
            return
        }
        this.setState({
            isModalShow: true,
            operList: ret.data
        })
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
            return (
                <div style={{padding: 8}}>
                    <Input
                        ref={node => {
                            this.searchInput = node;
                        }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                        style={{width: 188, marginBottom: 8, display: 'block'}}
                    />
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm)}
                        icon="search"
                        size="small"
                        style={{width: 90, marginRight: 8}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                </div>
            )
        },
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#ff3a38' : undefined}}/>
        ),
        onFilter: (value, record) => {
            return record[dataIndex]
                .toString().trim()
                .toLowerCase()
                .includes(value.toLowerCase())

        },
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => {

            return (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text && text.toString() || ""}
                />
            )
        },
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();

        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };
    getSorter = (text) => {
        return function (a, b) {
            let ac = a[text];
            let bc = b[text];
            if (!map[ac]) {
                map.push(ac);
            }
            if (!map[bc]) {
                map.push(bc);
            }
            return map.indexOf(ac) - map.indexOf(bc);
        }
    }

    render() {
        let _this = this;
        const myColumns = [
            {
                title: '设备编号',
                dataIndex: 'device_code',
                key: 'device_code',
                width: '10%',
                ...this.getColumnSearchProps('device_code'),
            },
            {
                title: '类型',
                dataIndex: 'class',
                key: 'class',
                width: '10%',
                sorter: this.getSorter("class"),
                ...this.getColumnSearchProps('class'),
                render(text, b, c, d) {

                    return text !== "电脑" ? <Highlighter
                        highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                        searchWords={[_this.state.searchText]}
                        autoEscape
                        textToHighlight={text && text.toString() || ""}
                    /> : <Highlighter
                        highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                        searchWords={[_this.state.searchText]}
                        autoEscape
                        textToHighlight={text && text.toString() || ""}
                    />
                }
            },
            {
                title: "购买单位",
                dataIndex: "buyer",
                key: "buyer",
                sorter: _this.getSorter("buyer")
            },
            {
                title: '品牌',
                dataIndex: 'brand',
                key: 'brand',
                ...this.getColumnSearchProps('brand'),
                sorter: _this.getSorter("brand"),
            },
            {
                title: '型号',
                dataIndex: 'type',
                key: 'type',
                ...this.getColumnSearchProps('type'),
            }, {
                title: '厂家编码',
                dataIndex: 'manufacturer_code',
                key: 'manufacturer_code',
                ...this.getColumnSearchProps('manufacturer_code'),
            }
            ,
            {
                title: '购买金额',
                dataIndex: 'monetary',
                key: 'monetary',
                ...this.getColumnSearchProps('monetary'),
            }
            , {
                title: '用户名',
                dataIndex: 'User.name',
                key: 'User.name',
                ...this.getColumnSearchProps('User.name'),
                sorter: this.getSorter("User.name")
            }, {
                title: "领用部门",
                dataIndex: "User.department.name",
                key: "User.department.name",
                ...this.getColumnSearchProps("User.department.name")
            }
            , {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                ...this.getColumnSearchProps('state'),
            },
        ]
        const computerColumns = [
            {
                title: '设备编号',
                dataIndex: 'device_code',
                key: 'device_code',
                width: '10%',
                ...this.getColumnSearchProps('device_code'),
            },
            {
                title: '品牌',
                dataIndex: 'brand',
                key: 'brand',
                sorter: _this.getSorter("brand"),
                ...this.getColumnSearchProps('brand'),
            }, {
                title: 'cpu',
                dataIndex: 'computer_spec.cpu',
                key: 'computer_spec.cpu',
                ...this.getColumnSearchProps('computer_spec.cpu'),
            }, {
                title: '硬盘',
                dataIndex: 'computer_spec.hard_driver',
                key: 'computer_spec.hard_driver',
                ...this.getColumnSearchProps('computer_spec.hard_driver'),
            }, {
                title: 'ip地址',
                dataIndex: 'computer_spec.ip_addr',
                key: 'computer_spec.ip_addr',
                ...this.getColumnSearchProps('computer_spec.ip_addr'),

            }, {
                title: 'Mac地址',
                dataIndex: 'computer_spec.mac',
                key: 'computer_spec.mac',
                ...this.getColumnSearchProps('computer_spec.mac'),
            }, {
                title: '内存',
                dataIndex: 'computer_spec.memory',
                key: 'computer_spec.memory',
                ...this.getColumnSearchProps('computer_spec.memory'),
            }, {
                title: '网络归属',
                dataIndex: 'computer_spec.net_attr',
                key: 'computer_spec.net_attr',
                ...this.getColumnSearchProps('computer_spec.net_attr'),
            }, {
                title: '操作系统',
                dataIndex: 'computer_spec.operation_system',
                key: 'computer_spec.operation_system',
                ...this.getColumnSearchProps('computer_spec.operation_system'),
            }, {
                title: '用户名',
                dataIndex: 'User.name',
                key: 'User.name',
                ...this.getColumnSearchProps('User.name'),
                sorter: this.getSorter("User.name")
            }, {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                ...this.getColumnSearchProps('state'),
                sorter: this.getSorter("state")
            },]
        const {Item} = Breadcrumb;


        return (<>
                <div style={{zIndex: "3", margin: "10px 20px"}}>
                    <Breadcrumb>
                        <Item><Link to={"/list"} style={{color: this.state.isAll ? "#6666ff" : "#aaaaaa"}}
                                    onClick={() => this.setState({isAll: true})}>全部</Link></Item>
                        <Item><Link to={"/list/computer"}
                                    style={{color: !this.state.isAll ? "#6666ff" : "#aaaaaa"}}
                                    onClick={() => this.setState({isAll: false})}>电脑详情页</Link></Item>
                    </Breadcrumb>
                </div>
                {this.state.isAll ? <Table columns={[...myColumns]} dataSource={this.props.list}
                                           onRow={(record, index) => {
                                               return {
                                                   onClick() {
                                                       _this.handleModalShow(record);
                                                   }
                                               }
                                           }//end lambda
                                           }
                    /> :
                    <Table columns={[...computerColumns]}
                           dataSource={this.props.list.filter((item) => item['class'] === "电脑")}
                    />}
                <Modal title={"设备履历"}
                       visible={this.state.isModalShow}
                       onOk={this.handleModalConfirm}
                       onCancel={this.handleCancel}
                >
                    <CoreList record={this.state.operList}>

                    </CoreList>
                </Modal>
            </>
        );
    }
}

export default connect(mapStateToProps, null)(List);