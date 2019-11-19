import React from "react";
import './BasicInformation.css'
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Input from "antd/lib/input";
import {Select, AutoComplete, notification} from "antd";
import {duplicateList} from "../utils";
import {addDevice} from "../ado";
import Button from '@material-ui/core/Button';
import UserInfo from "./UserInfo";
import {gFilter} from '../utils'

const mapStateToProps = function (state) {

    return {list: state.deviceList};
}


function Device(props) {
    const {Option} = Select;
    const {onChange, manufacturing_date, list, brand, type, device_code, manufacturer_code, remark, monetary, buyer} = props;
    const classVal = props['class'];

    const g = duplicateList(list);
    const gf = gFilter(g);
    return <div className={"profile"}>
        <div className={"profile-description"}>
            <h3>编辑 设备</h3>
            <h4>完善设备信息</h4>
        </div>
        <div className={"input-row"} style={{
            display: "flex"
        }}><Select name={"class"} defaultValue={"打印机"} style={{width: 120}}
                   value={classVal}
                   onChange={(val) => onChange("class", val)}>
            <Option value={"电脑"}>电脑</Option>
            <Option value={"打印机"}>打印机</Option>
            <Option value={"显示器"}>显示器</Option>
        </Select>
            <AutoComplete name={"brand"} dataSource={gf('brand', brand)} placeholder={"品牌"}
                          value={brand}
                          onChange={(val) => onChange("brand", val)}/>
            <AutoComplete dataSource={gf("type", type)} name={"type"} placeholder={"型号"}
                          value={type}
                          onChange={(val) => onChange("type", val)}/>
            <Input style={{width: "150px", flex: "0 0 150px"}} type={"number"} name={"monetary"} value={monetary}
                   placeholder={"购买金额"}
                   onChange={(e) => onChange("monetary", e.target.value)}/>
        </div>
        <div className={"input-row"}>
            <AutoComplete name={'buyer'} dataSource={gf("buyer", buyer)} placeholder={"购买单位"} value={buyer}
                          onChange={(val) => {
                              onChange("buyer", val);
                          }}/>
            <Input name={"device_code"} value={device_code} placeholder={"设备编码"}
                   onChange={(e) => onChange("device_code", e.target.value)}/>
            <Input name={"manufacturer_code"} value={manufacturer_code} placeholder={"厂家编码"}
                   onChange={(e) => onChange("manufacturer_code", e.target.value)}/>
        </div>
        <div className={"input-row"} style={{
            display: "flex"
        }}>

            <Input style={{display: "inline"}} name={"manufacturing_date"} type={"date"} placeholder={"生产日期"}
                   value={manufacturing_date} onChange={(e) => onChange("manufacturing_date", e.target.value)}/>
            <Input name={"remark"} value={remark} placeholder={"备注"}
                   onChange={(e) => onChange("remark", e.target.value)}/>
        </div>
    </div>
}

function Computer(props) {
    const {onChange, operation_system, ip_addr, net_attr, cpu, memory, hard_driver, list, mac} = props;
    const g = duplicateList(list);
    const gf = gFilter(g);
    return (
        <div style={{paddingTop: "10px"}} className={"profile computer"}>
            <div className={"input-row"}>
                <AutoComplete value={operation_system} dataSource={gf('operation_system', operation_system)}
                              name={"operation_system"} placeholder={"‘操作系统"}
                              onChange={(val) => onChange("operation_system", val)}/>
                <AutoComplete dataSource={gf('ip_addr', ip_addr)} value={ip_addr} name={"ip_addr"} placeholder={"ip地址"}
                              type={"ip"}
                              onChange={(val) => onChange("ip_addr", val)}/>
                <AutoComplete value={net_attr} dataSource={gf("net_attr", net_attr)} name={"net_attr"}
                              placeholder={"网络归属"}
                              onChange={(val) => onChange("net_attr", val)}/>
                <Input name={"mac"} value={mac} placeholder={"mac地址"}
                       onChange={(e) => onChange("mac", e.target.value)}/>
            </div>

            <div className={"input-row"}>
                <Input name={"cpu"} value={cpu} placeholder={"‘cpu"} onChange={(e) => onChange("cpu", e.target.value)}/>
                <Input name={"memory"} value={memory} placeholder={"内存"}
                       onChange={(e) => onChange("memory", e.target.value)}/>
                <Input name={"hard_driver"} value={hard_driver} placeholder={"硬盘"}
                       onChange={(e) => onChange("hard_driver", e.target.value)}/>
            </div>
        </div>
    )
}

class BasicInformation extends React.Component {
    constructor(props) {
        super(props);
    }

    initState = {
        class: "打印机",
        brand: "",
        "manufacturing_date": "",
        "hard_driver": '',
        "memory": '',
        "cpu": "",
        "ip_addr": "",
        net_attr: "",
        "operation_system": "",
        "remark": "",
        mac: "",
        "manufacturer_code": "",
        monetary: "",
        buyer: "",
        isUser: false
    }
    state = this.initState
    handleValueChange = (key, val) => {

        this.setState({[key]: val});
    }
    reset = () => {
        const {isUser} = this.state;
        this.setState({...this.initState, isUser});
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
                    <Item><Link to={"/basic"} style={{color: !this.state.isUser ? "#6666ff" : "#aaaaaa"}}
                                onClick={() => this.setState({isUser: false})}>添加设备</Link></Item>
                    <Item><Link to={"/basic/user"}
                                style={{color: this.state.isUser ? "#6666ff" : "#aaaaaa"}}
                                onClick={() => this.setState({isUser: true})}>添加用户</Link></Item>
                </Breadcrumb>
                <div style={{margin: "10px 20px 80px"}}>
                </div>
                {this.state.isUser ? <UserInfo list={this.props.list}/> : <div>
                    <Device onChange={this.handleValueChange} {...this.state} list={this.props.list}/>
                    {this.state.class === "电脑" ?
                        <Computer {...this.state} list={this.props.list} onChange={this.handleValueChange}/> : null}
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

                </div>}

            </>
        )
    }
}

export default connect(mapStateToProps)(BasicInformation)