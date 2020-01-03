import React from 'react';
import {CoreSearchAndEditTable} from "../components/CoreSearchAndEditTable";
import {getMaterialList} from "../redux/actionCreators";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        dataSource: state.materialList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMaterialList: () => dispatch(getMaterialList)
    }
}

export class MaterialTable extends React.Component {
    componentDidMount() {
        this.props.getMaterialList()
    }

    render() {
        let {dataSource} = this.props;
        dataSource = dataSource || [];
        console.log(dataSource);
        dataSource.forEach(function (item) {
            item['key'] = item['id'];
        })
        const materialColumns = [
            {
                title: "用途",
                dataIndex: "name",
                key: "name",
                editable: true
            },
            {
                title: "类型",
                dataIndex: "class",
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
                title: "单位",
                dataIndex: "unit",
                key: "unit",
                editable: true
            },
            {
                title: "数量",
                dataIndex: "number"
            }
        ]
        return (
            <CoreSearchAndEditTable dataSource={dataSource} columns={materialColumns}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialTable)