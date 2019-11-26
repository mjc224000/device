import React from "react";
import {AutoComplete, Select} from "antd";
import {duplicateList, gFilter} from "../utils";
import Input from "antd/lib/input";
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