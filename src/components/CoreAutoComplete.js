import React from "react";
import {AutoComplete} from 'antd';
import {func, array, any, string} from "prop-types";

export class CoreAutoComplete extends React.Component {
    static propTypes = {
        value: any,
        onChange: func,
        dataSource: array.isRequired,
        placeholder: string
    }

    render() {
        let {value, dataSource, placeholder, onChange} = this.props;
        let o = {};
        dataSource = dataSource || []
        dataSource.forEach(function (item) {
            if (item)
                o[item] = 1;
        });
        let ds = value ? Object.keys(o).filter(item => item.indexOf(value) > -1) : Object.keys(o);
        return (<AutoComplete  value={value}
                              dataSource={ds}
                              placeholder={placeholder}
                              onChange={onChange}/>)
    }
}