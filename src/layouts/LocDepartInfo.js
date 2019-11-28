import React from "react";
import {CoreForm} from "../components/CoreForm";
import {AutoComplete} from "antd";
import {getLocations, getDepartments} from "../ado";

export class LocDepartInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loc: "",
            depart: "",
            locs: [],
            departs: []
        };
    }

    async componentDidMount() {
        let ret = await getLocations();
        let data = ret.data;
       // let departs = await getDepartments();
       // departs = departs.data;
        this.setState({locs: data,})
    }

    handleSubmit = () => {

    }

    handleChange = (key, val) => {
        this.setState({[key]: val});
    }

    render() {
        console.log(this.state);
        return (<div>
            <CoreForm title={'部门和地点'} desc={"添加部门地点信息"}>
                <div className={"input-row"}>
                    <AutoComplete placeholder={"地点"}
                                  onChange={(val) => this.handleChange('loc', val)}

                    />
                </div>
            </CoreForm>
        </div>)
    }
}