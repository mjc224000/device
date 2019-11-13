import React from 'react';
import {Table, Button} from 'antd';


export class FilerAndSearchTable extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        data: []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({data: this.props.data})
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, "filters:", filters, "sorter:", sorter);
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

    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
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
        console.log(columns, "columns");
        return (
            <div>
                <div className="table-operations">
                </div>
                <Table columns={columns} dataSource={this.props.data} onChange={this.handleChange}/>
            </div>
        );
    }
}