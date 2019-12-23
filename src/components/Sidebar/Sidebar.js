import React from 'react';
import {Layout} from "antd";
import imgurl from '@/assets/img/sidebar-1.jpg'
import Button from "@material-ui/core/Button";
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext'
import PrintIcon from '@material-ui/icons/Print';
import CachedIcon from '@material-ui/icons/Cached';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import './Sidebar.css'

const {Header, Footer, Sider, Content} = Layout;
const SiderStyle = {
    boxShadow: "5px 0px 4px 4px",
    backgroundColor: "black",
    height: "100vh",
    position: "relative"
}
const LiStyle = {
    color: "white",
    listStyle: "none",
    zIndex: 4
}
const ButtonStyle = {
    color: "white",
    width: "90%",
    margin: "auto",
    display: "flex",
    textAlign: "left",
    textIndent: "20px",
    height: "48px",
    verticalAlign: "middle",
    cursor: "point",
    justifyContent: "start",

}

export class CoreSider extends React.Component {

    componentDidMount() {
        if (!window.location.href.includes('/')) {
            this.props.history.push("/statistic");
        }

    }

    handleRouteChange = (name) => {
        this.setState({currentName: name})
        this.props.history.push(name);
    }

    isActive(path) {
        return window.location.href.includes(path) ? 'active' : '';
    }

    render() {

        let isActive = this.isActive;
        return (
            <Sider width={250} {...this.props} style={SiderStyle}>
                <div className={"side-head"}>
                    < QueuePlayNextIcon className={'icon'}/><span className={"left"}>设备履历</span>
                </div>
                <hr/>
                <ul className={"sidebar-li"} style={LiStyle}>
                    <li>
                        <Button style={ButtonStyle}
                                className={isActive("/statistic")}
                                onClick={() => this.handleRouteChange('/statistic')}>
                            <FormatAlignLeftIcon/><span> 统计 </span>
                        </Button>
                    </li>
                    <li>
                        <Button style={ButtonStyle}
                                className={isActive('/rc')}
                                onClick={() => this.handleRouteChange('/rc')}>
                            <DateRangeIcon></DateRangeIcon> <span>耗材管理 </span>
                        </Button>
                    </li>
                    <li>
                        <Button style={ButtonStyle}
                                className={isActive('/list')}
                                onClick={() => this.handleRouteChange('/list')}>
                            <PrintIcon> </PrintIcon> <span>设备清单</span>
                        </Button>
                    </li>
                    <li><Button style={ButtonStyle}
                                className={isActive("/transfer")}
                                onClick={() => this.handleRouteChange('/transfer')}>
                        <CachedIcon/><span>设备转移 </span>
                    </Button></li>
                    <li><Button style={ButtonStyle}
                                className={isActive("/basic")}
                                onClick={() => this.handleRouteChange('/basic/computer')}>
                        <MenuBookIcon></MenuBookIcon> <span>基础信息</span> </Button></li>
                    <li><Button style={ButtonStyle}
                                className={isActive("/tft")}
                                onClick={() => this.handleRouteChange('/tft')}>
                        <ImportContactsIcon/> <span>领用记录</span> </Button></li>
                </ul>
                <div style={{backgroundImage: `url(${imgurl})`}} className={"side-bg"}></div>

            </Sider>
        )
    }
}