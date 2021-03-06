export function duplicateList(data) {
    return function (text) {
        let arr = [];
        data.forEach(function (item) {
            if (arr.indexOf(item[text]) === -1) {
                item[text] && item[text].trim() && arr.push(item[text]);
            }
        })
        return arr;
    }
}

export function deDuplicate(arr) {
    let o = {};
    for (let i = 0; i < arr.length; i++) {
        let key = arr[i];
        o[key] = null;
    }
    return Object.keys(o);
}

export function gFilter(fn) {
    return function (text, val) {
        return fn(text).filter(function (t) {
            if (val && val.trim()) {
                return t.indexOf(val) > -1;
            }
            return true
        })
    }
}

let _validator = {};
_validator.isRequired = function (arr) {
    let ret = true;
    for (let i = 0; i < arr.length; i++) {
        ret = !!arr[i];
        if (!ret) {
            return ret;
        }
    }
    return ret;
}
export let validator = _validator;

export function checkToken() {
    return localStorage.getItem('token');
}