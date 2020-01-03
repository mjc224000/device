import React from 'react';
import {Link, Switch, Route} from "react-router-dom";
import {Breadcrumb} from "antd";
import {Recipients} from "./MaterialRecipients";
import {Purchases} from "./MaterialPurchases";
import MaterialMain from "./MaterialMain";


export class Material extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log(1);
    }

    isActive(path, exact) {
        let isActive = window.location.href.includes(path);
        if (exact && isActive) {
            isActive = path.length === window.location.pathname.length;
        }
        return isActive ? 'active' : ''
    }


    render() {
        const {Item} = Breadcrumb;
        const isActive = this.isActive;
        return (<div>
            <div style={{zIndex: "3", margin: "10px 20px"}}>
                <Breadcrumb>
                    <Item><Link to={"/material"} style={{color: isActive('/material', true) ? "#6666ff" : "#aaaaaa"}}
                    >全部</Link></Item>
                    <Item><Link to={"/material/recipients"}
                                style={{color: isActive('/material/recipients') ? "#6666ff" : "#aaaaaa"}}
                    >领用</Link></Item>
                    <Item><Link to={'/material/purchases'}
                                style={{color: isActive('/material/purchases') ? "#6666ff" : "#aaaaaa"}}>
                        采购
                    </Link></Item>
                </Breadcrumb>
            </div>
            <Switch>
                <Route path={'/material'} exact component={MaterialMain}/>
                <Route path={'/material/recipients'} component={Recipients}/>
                <Route path={'/material/purchases'} component={Purchases}/>
            </Switch>
        </div>)
    }
}

