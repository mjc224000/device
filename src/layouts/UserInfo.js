import React from "react";
import Input from "antd/lib/input";
import {AutoComplete, notification} from "antd";
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {getDeviceList} from "../redux/actionCreators";
import {postUserInfo} from "../ado";
import {duplicateList} from "../utils";
import {gFilter} from '../utils'

const mapStateToProps = function (state) {

    return {list: state.deviceList};
}

function mapDispatchToProps(dispatch) {
    return {
        fetchList: () => getDeviceList(dispatch)
    }
}

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            code: "",
            department: ""
        }
    }

    restState = () => {
        this.setState({
            username: "", code: "",
            department: ""
        })
    }
    handleChange = (key, val) => {
        this.setState({[key]: val});
    }
    handleSubmit = async () => {
        let {username, code, department} = this.state;
        department = department.trim();
        try {
            let ret = await postUserInfo(username, code, department);
            if (ret.data && ret.data['msg']) {
                notification.open({message: "提交成功", duration: 1});
                this.restState();
            }
            await this.props.fetchList();
        } catch (e) {
            notification.open({message: "服务器错误", duration: 1});
        }
    }

    render() {
        const {username, code, department} = this.state;
        const list = this.props.list || [];
        const g = duplicateList(list);
        const gf = gFilter(g);
        return (<div className={"profile"}>
            <div className={"profile-description"}>
                <h3>编辑 用户</h3>
                <h4>完善用户信息</h4>
            </div>
            <div className={"input-row"}>
                <Input value={username} placeholder={"用户名"} onChange={(e) => {
                    this.handleChange('username', e.target.value)
                }}/>
                <Input value={code} placeholder={"员工编码"} onChange={(e) => {
                    this.handleChange('code', e.target.value)
                }
                }/>
                <AutoComplete dataSource={gf('User.department.name', department)}
                              value={department}
                              placeholder={"部门"}
                              onChange={(val) => {
                                  this.handleChange('department', val)
                              }}
                />
            </div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={this.handleSubmit} variant="contained" color="primary" style={{
                    background: "#9c27b0",
                    margin: "30px 100px",
                    textAlign: "center",
                    width: "200px",
                    fontSize: "20px",
                    fontWeight: "600"
                }}>
                    提 交
                </Button>
            </div>
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);