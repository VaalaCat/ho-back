
/**
 * 
 * @param {array} params [需要检查的参数]
 * @param {object} data 需要接检查的数据
 * @returns true:success/false:error
 */
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