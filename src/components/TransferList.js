import React from 'react';
import {List, Avatar} from 'antd';
import FastForwardIcon from '@material-ui/icons/FastForward';

export class CoreList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        console.log(this.props.record);

        return (<List
                itemLayout="horizontal"
                dataSource={this.props.record}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<FastForwardIcon></FastForwardIcon>}
                            title={` ${item['action_type'] === "send" ? "收回" : "领用"}`}
                            description={` ${item['collection_date'] ? `${item['collection_date']}` : "具体时间不详"}   ${item['action_type'] === "send" ? "收回" : "领用"}，使用者：${item['User.name']}，
                              备注：${item['remark']}
                              `}
                        />
                    </List.Item>
                )}
            />

        )
    }
}