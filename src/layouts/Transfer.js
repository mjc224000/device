import React from "react";
import {Table, Input, Button, Icon, Breadcrumb, Tag, Divider, AutoComplete} from 'antd';
import {CoreAutoComplete} from "../components/CoreAutoComplete";
import Highlighter from 'react-highlight-words';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getUsers, getLocations} from "../ado";
import './Transfer.css';
import SendIcon from '@material-ui/icons/Send';
import Fab from '@material-ui/core/Fab';
import {Modal} from "antd"
import {putDevice} from "../ado";
import {getDeviceList} from "../redux/actionCreators";

let map = [];
map.push("");

function mapStateToProps(state) {

    return {list: state.deviceList}
}

function mapDispatchToProps(dispatch) {
    return {
        fetchList: () => getDeviceList(dispatch)
    }
}

class Transfer extends React.Component {
    state = {
        searchText: "",
        users: [],
        activeUser: null,
        activeDevice: null,
        isModalShow: false,
        remark: '',
        locations: [],
        location: ""
    }

    async componentDidMount() {
        const res = await getUsers();

        this.setState({
            users: res.data
        })
    }

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };
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

    handleActionButtonClick = async (iShow) => {
        let ret = await getLocations();
        if (!iShow) {
            this.setState({isModalShow: false});
            return
        }
        this.setState({locations: ret.data.map(item => item['name'])})
        const {activeUser, activeDevice} = this.state;
        if (activeUser && activeDevice) {
            this.setState({isModalShow: true})
        }
    }
    handleSubmitTrans = async () => {
        const {activeUser, activeDevice, remark, location} = this.state;
        await putDevice(activeDevice['id'], activeUser['id'], remark, location);
        this.handleActionButtonClick(false);
        await this.props.fetchList();
    }
    handleRemarkChange = (val) => {
        this.setState({remark: val});
    }
    handleLocationChange = (val) => {
        this.setState({location: val});
    }

    render() {
        const _this = this;
        const columns = [
            {
                title: '设备编号',
                dataIndex: 'device_code',
                key: 'device_code',
                ..._this.getColumnSearchProps('device_code'),
            },
            {
                title: '类型',
                dataIndex: 'class',
                key: 'class',
                sorter: _this.getSorter("class"),
                ..._this.getColumnSearchProps('class'),
                render(text,) {

                    return <Highlighter
                        highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                        searchWords={[_this.state.searchText]}
                        autoEscape
                        textToHighlight={text && text.toString() || ""}
                    />
                }
            },
            {
                title: '用户名',
                dataIndex: 'User.name',
                key: 'User.name',
                ...this.getColumnSearchProps('User.name'),
                sorter: this.getSorter("User.name")
            }
        ];
        const userColumns = [
            {
                title: '用户名',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
                sorter: this.getSorter("name")
            },
            {
                title: '所在部门',
                dataIndex: 'department.name',
                key: 'department',
                ...this.getColumnSearchProps('department.name'),
                sorter: this.getSorter("department.name")
            }
        ]
        const state = this.state['activeDevice'] || {};
        const userState = this.state['activeUser'] || {};
        const curUser = state['User.name'];
        const classVal = state['class'];
        const brand = state['brand'];
        const type = state['type'];
        const deviceCode = state['deviceCode'];
        const department = state['User.department.name'];
        const {name} = userState;
        const userDepartment = userState['department.name'];
        const {location, locations} = this.state;
        return <div style={{
            zIndex: 3,
            margin: " 10px 20px",
            display: "flex",
            justifyContent: "space-between",
            position: "relative"
        }}>
            <Table style={{
                flex: "0 0 40%",
                boxShadow: "0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(156, 39, 176, .4)"
            }} dataSource={this.props.list} columns={columns}
                   onRow={function (record) {
                       return {
                           onClick() {
                               if (_this.state["activeDevice"]) {
                                   if (_this.state['activeDevice']["id"] === record["id"]) {
                                       _this.setState({
                                           activeDevice: null
                                       })
                                       return
                                   }
                               }
                               _this.setState({
                                   activeDevice: record,
                               })
                           }
                       }
                   }}
                   rowClassName={function (record, index) {
                       if (_this.state["activeDevice"]) {
                           if (_this.state["activeDevice"]["id"] === record["id"])
                               return "transfer-active"
                       }
                   }}
            />

            <div style={{
                flex: "0 0 50%",
                position: 'relative',
                display: "flex",
                justifyContent: "space-around"
            }}>
                <div style={{
                    height: "100%",
                    position: "relative",
                    width: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Fab aria-label={"转移"} style={{
                        background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
                        position: "relative",
                        left: "-50%"
                    }}>
                        <SendIcon style={{fontSize: "48px", color: "#aaa"}} onClick={this.handleActionButtonClick}/>
                    </Fab>

                </div>
                <Table style={{
                    flex: "0 0 70%",
                    boxShadow: "0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(156, 39, 176, .4)"
                }}
                       onRow={function (record) {
                           return {
                               onClick(e) {
                                   if (_this.state["activeUser"]) {
                                       if (_this.state['activeUser']["id"] === record["id"]) {
                                           _this.setState({
                                               activeUser: null
                                           })
                                           return
                                       }
                                   }
                                   _this.setState({
                                       activeUser: record,
                                   })
                               }
                           }
                       }} dataSource={this.state.users} columns={userColumns}
                       rowClassName={function (record, index) {
                           if (_this.state["activeUser"]) {
                               if (_this.state["activeUser"]["id"] === record["id"])
                                   return "transfer-active"
                           }
                       }}
                />
            </div>
            <Modal
                title="请确认信息"
                centered
                visible={this.state.isModalShow}
                onOk={() => this.handleSubmitTrans()}
                onCancel={() => this.handleActionButtonClick(false)}
            >
                <div style={{display: "flex"}}>
                    <div><h3>设备当前信息:</h3>
                        <p>领用人:{curUser} 当前部门:{department}</p>
                        <p>设备编码:{deviceCode} 类型:{classVal}</p>
                        <p>设备品牌:{brand} 型号:{type}</p>
                    </div>
                    <div style={{paddingLeft: "20px"}}>
                        <h3>转交给:</h3>
                        <p>领用人:{name}</p>
                        <p>所在部门:{userDepartment}   </p>
                        <div>使用地点： <CoreAutoComplete dataSource={locations}
                                                     value={location}
                                                     placeholder={"地点"}
                                                     onChange={this.handleLocationChange}
                        /></div>
                        <p style={{display: "flex", marginTop: "10px"}}><Input placeholder={"备注"}
                                                                               value={this.state.remark}
                                                                               onChange={(e) => this.handleRemarkChange(e.target.value)}/>
                        </p>
                    </div>
                </div>
            </Modal>
        </div>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transfer)