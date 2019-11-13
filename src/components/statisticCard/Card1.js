import React from "react";
import echarts from 'echarts'
import './card.css'
export class StatisticCard extends React.Component {
    constructor(props) {
        super(props);
        this.content = React.createRef();
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setData();
    }

    setData=()=>{
        const {name,number}=this.props;
        console.log(name,number)
        let option = {
            tooltip: {},
            legend: {
                data: ['数量']
            },
            xAxis: {
                data: name
            },
            yAxis: {},
            series: [{
                itemStyle: {
                    normal: {
                        color: function (oarams) {
                            console.log(oarams);
                            return 'white'
                        }
                    }
                },
                barWidth:"20%",
                name: '销量',
                type: 'bar',
                data: number
            }],
            backgroundColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                {offset: 0, color: "rgb(95,222,100)"},
                {offset: 1, color: "rgb(40,120,40)"}
            ])
        }
        const myChart = echarts.init(this.content.current)

        myChart.setOption(option);

    }

    render() {

        return (
            <div className={'card-container'} style={this.props.style}>
                <div style={{
                    width: "95%",
                    height: "75%",
                    borderRadius: "5px",
                    overflow: "hidden",
                    margin: "auto",
                    top: "-30px",
                    boxShadow:"0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)"
                }} id={'my-test'} ref={this.content}>

                </div>
                <h4 className={'card-title'}>
                    设 备 数 量
                </h4>
                  <p style={{color:"#999",paddingLeft:"1em",paddingTop:"4px"}}> 截至目前 各种类型设备数量</p>
                <hr style={{width:"96%",background:"#ccc",height:"1px" ,border:"none"}}/>
            </div>


        )
    }
}