import axios from 'axios';
import {checkToken} from "../utils";

export let request = axios
request.interceptors.response.use(res => {

    return res
}, err => {
    return Promise.reject(err.response && err.response.data || undefined);
})
request.interceptors.request.use(req => {
    let token = checkToken();
    if (token) {
        req.headers = {
            'X-Auth-Token': token
        }
    }
    return req
}, error => {
    throw error
})


export function fetchList() {
   request.get('/api/device').then(console.log);
    return request.get('/api/device')
}

export function getUsers() {
    return request.get('/api/user');
}

export function postUserInfo(username, code, department) {
    return request.post('/api/user', {username, code, department})
}

export function addDevice(payload) {
    return request.post('/api/device', payload)
}

export function putDevice(deviceId, UserId, remark, location) {
    if (!deviceId || !UserId) {
        return
    }
    return request.put('/api/device', {deviceId, UserId, remark, location});
}

export function getGroupCount() {
    return request.get('/api/statistic')
}

export function getOperations(recordId) {
    return request.get('/api/oper', {
        params: {recordId}
    })
}

export function getAllOperations() {
    return request.get('/api/oper/all')
}

export function getLocations() {
    return request.get('/api/locations')
}

export function getDepartments() {
    return request.get('/api/departments');
}

export function postDepartments(depart) {
    return request.post('/api/departments', {depart})
}

export function postLocations(loc) {
    return request.post('/api/locations', {loc})
}

export function getToken(passWord) {
    return request.get('/api/auth', {params: {passWord}})
}

export function putModified(row, key) {
    return request.put('/api/device/modified', {row, key})
}