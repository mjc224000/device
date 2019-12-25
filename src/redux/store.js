import {createStore, applyMiddleware} from 'redux';
//import thunk from "redux-thunk";
import {reducer} from "./reducer";

function myThunk() {
    return function (dispatch) {
        return function (action) {
            if (typeof action !== 'object') {
                action(dispatch)
            }

        };
    }
}

export const store = createStore(reducer, applyMiddleware(myThunk));