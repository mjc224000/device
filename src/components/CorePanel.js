import React from 'react';
import PropTypes from 'prop-types'
import './coreCard.css';
export class CorePanel extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        desc: PropTypes.string,
    }

    render() {
        const {onSubmit, title, desc} = this.props;
        return (<div className={'core-form'}>
            <div className={"profile"}>
                <div className={"profile-description"}>
                    <h3>{title}</h3>
                    <h4>{desc}</h4>
                </div>
                {this.props.children}
            </div>
        </div>)
    }
}