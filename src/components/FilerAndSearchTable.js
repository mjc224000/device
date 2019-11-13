import React from 'react';
import   { Table, Button } from 'antd';



export class FilerAndSearchTable extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        data:[]
    };
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.setState({data:this.props.data})
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({ filteredInfo: null });
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

    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                sorter: (a, b) => a.age - b.age,
                sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
                filteredValue: filteredInfo.address || null,
                onFilter: (value, record) => record.address.includes(value),
                sorter: (a, b) => a.address.length - b.address.length,
                sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
                ellipsis: true,
            },
        ];
        return (
            <div>
                <div className="table-operations">
                    <Button onClick={this.setAgeSort}>Sort age</Button>
                    <Button onClick={this.clearFilters}>Clear filters</Button>
                    <Button onClick={this.clearAll}>Clear filters and sorters</Button>
                </div>
                <Table columns={columns} dataSource={data} onChange={this.handleChange} />
            </div>
        );
    }
}