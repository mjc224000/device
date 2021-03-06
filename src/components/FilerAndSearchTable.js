import React from 'react';
import {Table, Button} from 'antd';
import {array} from 'prop-types'
import {duplicateList} from "../utils";

/***
 * example
 *  const columns = [
 {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        ellipsis: true,
        onFilter:(value,record)=>record['name'].include(value)
    },
 {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        ellipsis: true,
        onFilter: (value, record) => record.department.includes(value),
        filters: duplicateList(data)("department").map(function (item) {
            return {text: item, value: item}
        })
    },
 ];
 */


export class FilerAndSearchTable extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,

    };
    static propTypes = {
        columns: array.isRequired,
        data: array.isRequired
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({filteredInfo: null});
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };


    mapPropsToColumn = () => {
        let {sortedInfo, filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        let column = this.props['columns'] || [];
        return column.map(function (item) {
            let dataIndex = item['dataIndex'];
            item["sortOrder"] = sortedInfo.columnKey === dataIndex && sortedInfo.order;
            item['filteredValue'] = filteredInfo[dataIndex] || null;
            return item;
        })
    }

    render() {
        let {sortedInfo, filteredInfo} = this.state;
        let columns = this.mapPropsToColumn();
        return (
            <div>
                <div className="table-operations" style={{paddingRight: "20px"}}>
                </div>
                <Table
                    style={{boxShadow: "0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(156, 39, 176, .4)",}} {...this.props}
                    columns={columns} dataSource={this.props.data} onChange={this.handleChange}/>
            </div>
        );
    }
}