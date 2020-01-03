import React from 'react';
import {CoreForm} from "../components/CoreForm";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/core/SvgIcon/SvgIcon";

export class Recipients extends React.Component {
    constructor(props) {
        super(props);
    }

    handleActionButtonClick = () => {

    }

    render() {
        return <div style={{display: "flex", width: "100%", marginTop: "100px", justifyContent: "space-around"}}>
            <div style={{flex: "0 0 45%",}}>
                <CoreForm title={"领用"}
                          desc={"填写领用信息"}
                          onSubmit={this.handleFormSubmit}
                >
                </CoreForm>

            </div>
            <Fab aria-label={"转移"} style={{
                background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
                position: "relative"
            }}>
                <SendIcon style={{fontSize: "48px", color: "#aaa"}} onClick={this.handleActionButtonClick}/>
            </Fab>
        </div>
    }
}