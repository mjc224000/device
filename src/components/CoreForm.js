import React from 'react';
import PropTypes from 'prop-types'
import './coreCard.css';
import {Button} from "antd";

export class CoreForm extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        desc: PropTypes.string,

    }

    render() {
        const{onClick}=this.props;
        return (<div className={'core-form'}>
            <div className={"profile form-title"}>
                <div className={"profile-description"} >
                    <h3>编辑 用户</h3>
                    <h4>完善用户信息</h4>
                </div>
            </div>
            {this.props.children}
            <div  style={{display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={onClick} variant="contained" color="primary"/>
            </div>
        </div>)
    }
}