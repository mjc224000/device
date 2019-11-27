import React from "react";
import './BasicInformation.css'
import {Breadcrumb} from "antd";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import Input from "antd/lib/input";
import {Select, AutoComplete, notification} from "antd";
import {duplicateList} from "../utils";
import {addDevice} from "../ado";
import Button from '@material-ui/core/Button';
import UserInfo from "./UserInfo";
import {gFilter} from '../utils'
import {CoreLink} from "../components/CoreLink";
import {LocDepartInfo} from "./LocDepartInfo";
import {DeviceInfo} from "./DeviceInfo";

const mapStateToProps = function (state) {

    return {list: state.deviceList};
}

class BasicInformation extends React.Component {
    constructor(props) {
        super(props);
    }
    state = this.initState
    handleValueChange = (key, val) => {

        this.setState({[key]: val});
    }
    reset = () => {
        this.setState({...this.initState});
    }
    handleSubmit = async () => {
        try {
            let {isUser, ...rest} = this.state;
            let ret = await addDevice({...rest});
            if (ret.data["msg"] === 'ok') {
                this.openNotification("提交成功", "");
                this.reset();
            }
            if (ret.data["op"] === "bad") {
                this.openNotification("失败", ret.data['msg']);
            }
        } catch (e) {
            this.openNotification("失败", "网络错误");
        }


    }
    openNotification = (title, desc) => {
        const args = {
            message: title,
            description: desc,
            duration: 0,
        };
        notification.open(args);
    }

    render() {
        const {Item} = Breadcrumb;
        return (
            <>
                <Breadcrumb style={{paddingLeft: "50px", paddingTop: "20px"}}>
                    <Item><CoreLink to={"/basic/computer"}>添加设备</CoreLink></Item>
                    <Item><CoreLink to={"/basic/user"}>添加用户</CoreLink></Item>
                    <Item> <CoreLink to={'/basic/department'}> 地点和部门</CoreLink></Item>
                </Breadcrumb>
                <div style={{margin: "10px 20px 80px"}}></div>
                <Switch>
                    <Route path={'/basic/user'} component={() => <UserInfo list={this.props.list}/>}/>
                    <Route path={'/basic/department'} component={LocDepartInfo}/>
                    <Route path={'/basic/computer'} component={()=><DeviceInfo list={this.props.list}/>}/>
                </Switch>
            </>
        )
    }
}

export default connect(mapStateToProps)(BasicInformation)