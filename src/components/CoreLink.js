import React from 'react'
import {Link} from 'react-router-dom'

export class CoreLink extends React.Component {
    render() {
        const {to, children, onClick} = this.props;
        let color = window.location.href.indexOf(to) > -1 ? "#6666ff" : "#aaaaaa"
        return (<Link to={to}
                      style={{color}}
                      onClick={onClick}>
            {children}
        </Link>)
    }
}