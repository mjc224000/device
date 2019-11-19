import React from 'react';
import './coreCard.css';

export class CoreCard extends React.Component {
    render() {
        return (<div className={'core-card'} style={{borderRadius: "5px"}}>
            <div className={'core-card-thumb'}></div>
            <div className={'core-thumb-right'}>

            </div>
        </div>)
    }
}