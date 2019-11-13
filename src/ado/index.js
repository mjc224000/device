import axios from 'axios';

export let request = axios
request.interceptors.response.use(res => {
    return res
}, err => {
    return Promise.reject(err.response && err.response.data || undefined);
})
request.interceptors.request.use(req => {
    return req
}, error => {
    throw error
})


export function fetchList() {
    return request.get('/api/device')
}

export function getUsers() {
    return request.get('/api/user');
}
export function postUserInfo(username,code,department) {
    return request.post('/api/user',{username,code,department})
}

export function addDevice(payload) {
    return request.post('/api/device', payload)
}

export function putDevice(deviceId, UserId,remark) {
    if (!deviceId || !UserId) {
        return
    }
    return request.put('/api/device', {deviceId, UserId,remark});
}
export function getGroupCount() {
    return request.get('/api/statistic')
}