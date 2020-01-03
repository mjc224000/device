import {GET_LIST, MODIFIED, ADD_DEVICE, GET_MATERIAL_LIST} from "./actionTypes";
import React from 'react';
import {fetchList} from "../ado";
import {withMobileDialog} from "@material-ui/core";
import {putModified} from "../ado";
import {notification} from "antd";
import {addDevice} from "../ado";
import {fetchMaterial} from "../ado";

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
            notification.open({message: "修改成功"});
            return true;
        } else {
            notification.open({message: "修改失败"});
            return false;
        }

    }
}

export function AddItem(payload) {
    return async function (dispatch) {
        try {
            let ret = await addDevice({...payload});
            if (ret.data['msg'] === 'ok') {
                dispatch({type: ADD_DEVICE, payload});
                return true
            }

        } catch (e) {
            return false
        }

    }
}

export async function getMaterialList(dispatch) {
    let ret = await fetchMaterial();
    let data = ret.data;
    dispatch({type: GET_MATERIAL_LIST, payload: data});

}