import {GET_LIST} from "./actionTypes";

const initState = {
    deviceList: []
}

export function reducer(state = initState, action) {
    switch (action.type) {
        case GET_LIST:
            return Object.assign({},state,{
                deviceList:action.payload
            })
        default :
            return state
    }
}
