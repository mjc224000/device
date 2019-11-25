import React from "react";
import {AutoComplete} from 'antd';

export class CoreAutoComplete extends React.Component {

    render() {
        const {value, dataSource, placeholder, onChange} = this.props;
        let o={};
        dataSource.forEach(function (item) {
            o[item]=1;
        });
        return (<AutoComplete value={value}
                              dataSource={Object.keys(o).filter(item => item.indexOf(value) > -1)}
                              placeholder={placeholder}
                              onChange={onChange}/>)
    }
}