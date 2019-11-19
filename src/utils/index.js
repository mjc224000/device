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