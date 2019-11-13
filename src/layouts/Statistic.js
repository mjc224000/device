import React from "react";
import {StatisticCard} from "../components/statisticCard/Card1";
import {getGroupCount} from "../ado";
import "./App.css"
export class Statistic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: [],
            number: []

        }
    }

    async componentDidMount() {
        let ret = await getGroupCount();
        console.log(ret);
        let name = [], number = [];
        ret.data.forEach(function (item) {
            let n = item['class']
            let num = item['数量'];
            name.push(n);
            number.push(num);
        })
        this.setState({
            name: name,
            number: number
        })
    }

    render() {
        const {name, number} = this.state;
        console.log(name, number)
        return (<>
               <h3 className={'layout-title'} >统计报表</h3>
                <div style={{display: "flex", justifyContent: "center", height: "300px"}}>
                    <StatisticCard name={name} number={number} style={{flex: "0 0 30%"}}/>
                </div>
            </>
        )
    }
}