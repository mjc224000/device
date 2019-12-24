import {GET_LIST, MODIFIED} from "./actionTypes";

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
            deviceList.splice(index, 1, {...item, ...row})
        }
        default :
            return state
    }
}
