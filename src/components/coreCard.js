import React from 'react';
import './coreCard.css';
import CropDinIcon from '@material-ui/icons/CropDin';

export class CoreCard extends React.Component {
    render() {
        return (<div className={'core-card'} style={{borderRadius: "5px"}}>
            <div className={'core-card-thumb'}>
                <CropDinIcon/>
            </div>
            <div className={'core-thumb-right'}>
                            asdasd
            </div>
        </div>)
    }
}