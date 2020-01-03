import {GET_LIST, MODIFIED, ADD_DEVICE, GET_MATERIAL_LIST} from "./actionTypes";

const initState = {
    deviceList: [],
    materialList: []
}

export function reducer(state = initState, action) {
    switch (action.type) {
        case GET_LIST:
            return Object.assign({}, state, {
                deviceList: action.payload
            })
        case MODIFIED: {
            const {row, key} = action.payload
            let deviceList = state.deviceList;
            const index = deviceList.findIndex(item => key === item.key);
            const item = deviceList[index];
            deviceList.splice(index, 1, {...item, ...row});
            return Object.assign({}, state, {deviceList});
        }
        case ADD_DEVICE: {
            let item = action.payload;
            let deviceList = state.deviceList;
            deviceList.push(item);
            return Object.assign({}, state, {deviceList})
        }
        case GET_MATERIAL_LIST: {
            let materialList = action.payload;
            return Object.assign({}, state, {materialList});
        }
        default :
            return state
    }
}
