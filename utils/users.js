const model = require('../model.js')

let User = model.User;

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {string} true:right/flase:wrong
 */
let checkPassword = async (email, passwd) => {
	return new Promise(async (resolve, reject) => {
		User
			.findAll({ where: { email: email, passwd: passwd } })
			.then(data => { if (data.length > 0) resolve(true); else resolve(false) })
			.catch(err => resolve(false))
	})
}

/**
 * 用于添加用户，保证所有参数非空
 * @param {object} user 
 * @param {string} user.name
 * @param {string} user.email
 * @param {string} user.passwd
 * @param {string} user.phone
 * @param {string} user.role
 * @returns {boolean} true:success/false:error
 */
let addUser = async (user) => {
	return new Promise(async (resolve, reject) => {
		User
			.create(user)
			.then(data => resolve(true))
			.catch(err => resolve(false))
	})
}

/**
 * 用于修改用户信息，保证email非空
 * @param {object} user 
 * @param {string} user.name
 * @param {string} user.email
 * @param {string} user.passwd
 * @param {string} user.phone
 * @param {string} user.role
 * @returns {integer} true:success/false:error
 */
let updateUser = async (user) => {
	return new Promise(async (resolve, reject) => {
		User
			.update(user, { where: { email: user.email } })
			.then(data => resolve(true))
			.catch(err => resolve(false))
	})
}

/**
 * 获取用户详细信息
 * @param {string} info {查询字典}
 * @returns info
 */
let getUserInfo = async (info) => {
	return new Promise(async (resolve, reject) => {
		User
			.findAll({ where: info })
			.then(user => resolve(user))
			.catch(err => resolve(false))
	})
}

module.exports = {
	checkPassword,
	addUser,
	updateUser,
	getUserInfo
}