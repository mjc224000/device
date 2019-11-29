import React from 'react';
import PropTypes from 'prop-types'
import './coreCard.css';
import Button from "@material-ui/core/Button";
export class CoreForm extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        desc: PropTypes.string,
        onSubmit:PropTypes.func

    }

    render() {
        const{onSubmit,title,desc}=this.props;
        return (<div className={'core-form'}>
            <div className={"profile"}>
                <div className={"profile-description"} >
                    <h3>{title}</h3>
                    <h4>{desc}</h4>
                </div>
                {this.props.children}
                <div  style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button style={{
                        background:"linear-gradient(60deg, #ab47bc, #8e24aa)",
                        color:"white",
                        padding:"10px,20px",
                        margin:"20px",
                    }} onClick={onSubmit}  variant="contained" type={"submit"}>提交</Button>
            </div>
            </div>


        </div>)
    }
}