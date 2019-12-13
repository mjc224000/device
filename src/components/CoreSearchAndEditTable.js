import React from 'react';
import {Table, Input, InputNumber, Popconfirm, Form} from 'antd';
import {FilerAndSearchTable} from "./FilerAndSearchTable";
import {array} from "prop-types";
import {CoreAutoComplete} from "./CoreAutoComplete";
import Button from "@material-ui/core/Button";

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
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
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    /*  static propTypes = {
          columns: array.isRequired,
          dataSource: array.isRequired
      }
  */


    constructor(props) {
        super(props);
        this.state = {data, editingKey: '', searchText: ""};

    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({editingKey: ''});
    };

    save(form, key) {
        const onSave = this.props.onSave;
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);

            const item = newData[index];
            console.log(item, row);
            newData.splice(index, 1, {
                ...item,
                ...row,
            });
            this.setState({data: newData, editingKey: ''});

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
            console.log(option);
            return <div style={{padding: 8}}>
                <div>
                    <CoreAutoComplete
                        dataSource={[]}
                        value={selectedKeys[0]}
                        onChange={val => setSelectedKeys([val])}
                    />
                </div>
                <Button onClick={() => this.handleReset(clearFilters)}>取消</Button>
                <Button onClick={() => this.handleSearch(selectedKeys, confirm)}>搜索</Button>
            </div>
        },
        onFilter: (value, record) => {
            console.log(dataIndex, value, record);
            return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
        }
    })

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                width: '25%',
                editable: true,
                onFilter: (value, record) => {
                    console.log(value, record);
                    return true
                },
                filters: [{text: 123, value: "123"}],
                ...this.getColumnSearchProps("name")

            },
            {
                title: 'age',
                dataIndex: 'age',
                width: '15%',
                editable: true,
            },
            {
                title: 'address',
                dataIndex: 'address',
                width: '40%',
                editable: true,
            },
            {
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
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
                    ) : (
                        <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                            Edit
                        </a>
                    );
                },
            },
        ];
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <EditableContext.Provider value={this.props.form}>
                <Table
                    dataSource={this.state.data}
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
