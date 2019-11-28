import React from "react";
import {AutoComplete} from 'antd';

export class CoreAutoComplete extends React.Component {

    render() {
        const {value, dataSource, placeholder, onChange} = this.props;
        let o = {};
        dataSource.forEach(function (item) {
            if(item)
            o[item] = 1;
        });
        let ds = value ? Object.keys(o).filter(item => item.indexOf(value) > -1) : Object.keys(o);
        return (<AutoComplete value={value}
                              dataSource={ds}
                              placeholder={placeholder}
                              onChange={onChange}/>)
    }
}