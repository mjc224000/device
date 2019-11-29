import React from "react";
import {CoreForm} from "../components/CoreForm";
import {CoreAutoComplete} from "../components/CoreAutoComplete";
import {getLocations, getDepartments, postDepartments, postLocations} from "../ado";

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

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        let ret = await getLocations();
        let data = ret.data;
        let departs = await getDepartments();
        departs = departs.data;
        this.setState({locs: data, departs})
    }

    handleSubmit = async () => {
        const {loc,depart}=this.state;
        if(loc)
           await postLocations(loc);
        if(depart)
           await postDepartments(depart);

    }

    handleChange = (key, val) => {
        val = val.trim();
        this.setState({[key]: val});
    }

    render() {
        console.log(this.state);
        const {locs, loc, departs, depart} = this.state;
        return (<div>
            <CoreForm title={'部门和地点'} desc={"添加部门地点信息"}>
                <div className={"input-row"}>
                    <CoreAutoComplete placeholder={"地点(选填)"}
                                      value={loc}
                                      dataSource={locs.map(item => item['name'])}
                                      onChange={(val) => this.handleChange('loc', val)}

                    />
                    <CoreAutoComplete
                        placeholder={"部门（选填）"}
                        value={depart}
                        dataSource={departs.map(item => item['name'])}
                        onChange={val => this.handleChange('depart', val)}
                        onSubmit={this.handleSubmit}
                    />
                </div>
            </CoreForm>
        </div>)
    }
}