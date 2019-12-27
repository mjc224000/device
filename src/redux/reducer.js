import {GET_LIST, MODIFIED,ADD_DEVICE} from "./actionTypes";

const initState = {
    deviceList: []
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
        case ADD_DEVICE:{
            let item=action.payload;
            let deviceList=state.deviceList;
            deviceList.push(item);
            return Object.assign({},state,{deviceList})
        }
        default :
            return state
    }
}
