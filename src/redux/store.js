import {createStore, applyMiddleware} from 'redux';
//import thunk from "redux-thunk";
import {reducer} from "./reducer";


function myThunk() {
    return function (dispatch) {
        return async function (action) {
            if (typeof action !== 'object') {
                let ret = await action(dispatch);
                return ret;
            } else {
                return dispatch(action)
            }
        };
    }
}

export const store = createStore(reducer, applyMiddleware(myThunk));