import React from 'react';
import {Table, Input, InputNumber, Popconfirm, Form} from 'antd';
import {FilerAndSearchTable} from "./FilerAndSearchTable";
import {array, func} from "prop-types";
import {CoreAutoComplete} from "./CoreAutoComplete";
import Button from "@material-ui/core/Button";
import {deDuplicate} from "../utils";


const EditableContext = React.createContext();

class EditableCell extends React.Component {

    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };
    renderCell = ({getFieldDecorator}) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{margin: 0}}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    /*required: true,*/
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (children)}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    static propTypes = {
        columns: array.isRequired,
        dataSource: array.isRequired,
        onSave: func
    }

    constructor(props) {
        super(props);
        this.state = {editingKey: '', searchText: ""};

    }
    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({editingKey: ''});
    };

    save = async (form, key) => {

        form.validateFields(async (error, row) => {
            if (error) {
                return;
            }
            const onSave = this.props.onSave;
            await onSave(row, key);
            this.setState({editingKey: ''})
        });

    }

    edit(key) {
        this.setState({editingKey: key});
    }

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
        console.log(selectedKeys, confirm)
    }
    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({searchText: ''});
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: (option) => {
            const {setSelectedKeys, selectedKeys, confirm, clearFilters} = option;
            let dataSource = this.props.dataSource;
            dataSource = dataSource.map(function (item) {
                return item[dataIndex];
            })
            return <div style={{padding: 8}}>
                <div>
                    <CoreAutoComplete
                        dataSource={deDuplicate(dataSource)}
                        value={selectedKeys[0]}
                        onChange={val => setSelectedKeys([val])}
                    />
                </div>
                <Button onClick={() => this.handleReset(clearFilters)}>取消</Button>
                <Button onClick={() => this.handleSearch(selectedKeys, confirm)}>搜索</Button>
            </div>
        },
        onFilter: (value, record) => {
            return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
        }
    })
    mapPropsToColumns = (columns=[]) => {
        columns = columns.map(col => {
            let ret = col;
            if (col.editable) {
                ret = {
                    ...ret,
                    onCell: record => ({
                        record,
                        inputType: col.dataIndex === 'age' ? 'number' : 'text',
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: this.isEditing(record),
                    }),
                };
            }
            if (col.canSearch) {
                ret = {
                    ...ret,
                    ...this.getColumnSearchProps(col.dataIndex)
                }
            }
            return ret;
        });
        columns.push(this.operationColumn());
        return columns;
    }
    operationColumn = () => {
        return {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                const {editingKey} = this.state;
                const editable = this.isEditing(record);
                return editable ? (
                    <span>
              <EditableContext.Consumer>
                {form => (
                    <a
                        onClick={() => this.save(form, record.key)}
                        style={{marginRight: 8}}
                    >
                        Save
                    </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确认取消吗?" onConfirm={() => this.cancel(record.key)}>
                <a>取消</a>
              </Popconfirm>
            </span>) : (<a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                    编辑
                </a>);
            },
        }
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        let columns = this.props.columns;

        columns = this.mapPropsToColumns(columns);
        return (
            <EditableContext.Provider value={this.props.form}>
                <Table
                    dataSource={this.props.dataSource}
                    components={components}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                />
            </EditableContext.Provider>
        );
    }
}

export const CoreSearchAndEditTable = Form.create()(EditableTable);
