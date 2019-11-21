import React, {useEffect} from 'react';
import logo from './logo.svg';
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import List from './layouts/List'
import {Statistic} from "./layouts/Statistic";
import Transfer from "./layouts/Transfer";
import {Layout} from "antd";
import {CoreSider} from './components/Sidebar/Sidebar';
import BasicInformation from "./layouts/BasicInformation";
import {SendAndReceiving} from "./layouts/SendandReceiving";
import {TransferTable} from './layouts/transferList'
import 'antd/dist/antd.min.css'
import {Provider} from 'react-redux';
import {store} from "./redux/store";
import {getDeviceList} from "./redux/actionCreators";
import {connect} from 'react-redux';

const {Header, Footer, Content} = Layout;

function mapDispatchToProps(dispatch) {
    return {
        fetchList: () => getDeviceList(dispatch)
    }
}

const hist = createBrowserHistory();

function App(props) {
    useEffect(() => {
        props.fetchList();
    })
    return (

        <Layout style={{display: "flex"}}>
            <CoreSider history={hist}></CoreSider>
            <Layout>
                <Content>
                    <Switch>
                        <Route path={"/list"} component={List}/>
                        <Route path={"/statistic"} component={Statistic}/>
                        <Route path={"/transfer"} component={Transfer}/>
                        <Route path={"/basic"} component={BasicInformation}/>
                        <Route path={"/rc"} component={SendAndReceiving}/>
                        <Route path={"/tft"} component={TransferTable}/>
                        <Route path={"/"} component={Statistic}/>

                    </Switch>
                </Content>
            </Layout>
        </Layout>

    );
}

App = connect(null, mapDispatchToProps)(App);

function MainApp() {
    return (<Provider store={store}>
        <Router history={hist}>
            <App/>
        </Router>
    </Provider>)
}

export default MainApp;