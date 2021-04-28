let paramCheck = (params, data) => {
    for (let i in params) {
        if (typeof data[params[i]] === 'undefined') {
            return false;
        }
    }
    return true;
}
let timeCheck = (data) => {
    return true;
}

module.exports = {
    paramCheck,
    timeCheck
}