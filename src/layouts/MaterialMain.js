import React from 'react';
import {CoreForm} from "../components/CoreForm";
import {CoreAutoComplete} from "../components/CoreAutoComplete";
import {CoreSearchAndEditTable} from "../components/CoreSearchAndEditTable";
import {fetchMaterial, postMaterial, putMaterial} from "../ado";
import {validator} from "../utils";
import {notification} from "antd";

let initState = {
    name: "",
    type: '',
    unit: "",
    class: "",
    brand: ""
}

export class MaterialMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    async componentDidMount() {
        let ret = await fetchMaterial();
        this.setState({dataSource: ret.data});
    }

    handleFormSubmit = async () => {
        if (!validator.isRequired(Object.values(this.state))) {
            notification.error({
                message: "请完善表单"
            });
            return
        }
        let ret = await postMaterial(this.state);
        notification.open({message: ret.data.msg});
        this.setState({...initState});
    }
    handleValueChange = (key, val) => {
        this.setState({[key]: val});
    }

    render() {
        let {name, type, brand, unit,  dataSource} = this.state;
        dataSource = dataSource || [];
        dataSource.forEach(function (item) {
            item['key'] = item['id'];
        })
        const classVal = this.state['class'];
        const materialColumns = [
            {
                title: "用途",
                dataIndex: "name",
                key: "name",
                editable: true
            },
            {
                title: "类型",
                dataSource: "class",
                key: "class",
                editable: true
            },
            {
                title: "品牌",
                dataIndex: "brand",
                key: "brand",
                editable: true
            },
            {
                title: "型号",
                dataIndex: "type",
                key: "type",
                editable: true
            },
            {
                title:"单位",
                dataIndex:"unit",
                key:"unit",
                editable:true
            },
            {
                title:"数量",
                dataIndex:"number"
            }
        ]
        return <div style={{display: "flex", width: "100%", marginTop: "100px", justifyContent: "space-around"}}>
            <div style={{flex: "0 0 45%",}}>
                <CoreForm title={"耗材"}
                          desc={"完善信息"}
                          onSubmit={this.handleFormSubmit}
                >
                    <div className={"input-row"}>
                        <CoreAutoComplete
                            dataSource={dataSource.map(item => item['name'])}
                            value={name}
                            placeholder={'用途'}
                            onChange={val => this.handleValueChange('name', val)}
                        />
                        <CoreAutoComplete
                            dataSource={dataSource.map(item => item['brand'])}
                            value={brand}
                            placeholder={'品牌'}
                            onChange={val => this.handleValueChange('brand', val)}
                        />
                        <CoreAutoComplete
                            dataSource={dataSource.map(item => item['type'])}
                            value={type}
                            placeholder={'型号'}
                            onChange={val => this.handleValueChange('type', val)}
                        />
                    </div>
                    <div className={'input-row'}>
                        <CoreAutoComplete
                            dataSource={dataSource.map(item => item['class'])}
                            value={classVal}
                            placeholder={'类别'}
                            onChange={val => this.handleValueChange('class', val)}
                        />
                        <CoreAutoComplete
                            dataSource={dataSource.map(item => item['unit'])}
                            value={unit}
                            placeholder={'单位'}
                            onChange={val => this.handleValueChange('unit', val)}
                        />
                    </div>
                </CoreForm></div>

            <div><CoreSearchAndEditTable dataSource={dataSource} columns={materialColumns}/></div>
        </div>
    }
}