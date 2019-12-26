import {GET_LIST, MODIFIED} from "./actionTypes";
import React from 'react';
import {fetchList} from "../ado";
import {withMobileDialog} from "@material-ui/core";
import {putModified} from "../ado";
import {notification} from "antd";

export async function getDeviceList(dispatch) {
    let res = await fetchList();
    let payload = res.data;
    payload.forEach(function (item) {
        for (let key in item) {
            item[key] = item[key] || ""
        }
        item['operation_system'] = item['computer_spec.operation_system']
        item['net_attr'] = item['computer_spec.net_attr']
        item['ip_addr'] = item['computer_spec.ip_addr']
    })
    dispatch({
        type: GET_LIST,
        payload: payload
    })
}

export function modifiedList(row, key) {
    return async function (dispatch) {

        let ret = await putModified(row, key);
        if (ret.data['msg'] === 'ok') {
            dispatch({type: MODIFIED, payload: {row, key}});
            notification.open({message:"修改成功"});
        }else {
            notification.open({message:"修改失败"});
        }

    }
}