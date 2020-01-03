import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import List from './layouts/List'
import {Statistic} from "./layouts/Statistic";
import Transfer from "./layouts/Transfer";
import {Layout} from "antd";
import {CoreSider} from './components/Sidebar/Sidebar';
import BasicInformation from "./layouts/BasicInformation";
import SendAndReceiving from "./layouts/SendandReceiving";
import {TransferTable} from './layouts/TransferTable'
import {Material} from "./layouts/Material";
import 'antd/dist/antd.min.css'
import {Provider} from 'react-redux';
import {store} from "./redux/store";
import {getDeviceList} from "./redux/actionCreators";
import {connect} from 'react-redux';
import {Modal, Input} from "antd";
import {getToken} from "./ado";
import {checkToken} from "./utils";


const {Header, Footer, Content} = Layout;

function mapDispatchToProps(dispatch) {
    return {
        fetchList: () => dispatch(getDeviceList)
    }
}

const hist = createBrowserHistory();

function App(props) {
    let [isModalShow, setIsModalShow] = useState(checkToken() ? false : true);
    useEffect(() => {
        props.fetchList();
    })
    const [passWd, setPassWd] = useState('');

    function onPassWdChange(val) {
        setPassWd(val);
    }

    function handleModalCancel() {
        if (checkToken()) {
            setIsModalShow(false);
        }
    }

    async function handleSubmit() {
        let ret = await getToken(passWd);

        let data = ret.data;
        if (data['token']) {
            localStorage.setItem('token', data['token']);
        }
        handleModalCancel();
    }

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
                        <Route path={'/material'}   component={Material}/>
                        <Route path={"/"} component={Statistic}/>
                    </Switch>
                </Content>
            </Layout>
            <Modal visible={isModalShow} title={'请输入验证信息'}
                   onCancel={handleModalCancel}
                   onOk={handleSubmit}
            >
                <div style={{display: "flex"}}>
                    密码：<Input style={{flexBasis: "80%"}} type={'password'} value={passWd}
                              onChange={e => onPassWdChange(e.target.value)}/>
                </div>
            </Modal>
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