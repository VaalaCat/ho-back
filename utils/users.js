const model = require('../model.js')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let User = model.User;

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {string} true:right/flase:wrong
 */
const checkPassword = async (email, passwd) => {
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
const addUser = async (user) => {
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
const updateUser = async (user) => {
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
const getUserInfo = async (info) => {
	return new Promise(async (resolve, reject) => {
		User
			.findAll({ where: info })
			.then(user => resolve(user))
			.catch(err => resolve(false))
	})
}

/**
 * 用于删除一个用户
 * @param {string} id 用户ID
 */
const deleteUser = async (id) => {
	return new Promise(async (resolve, reject) => {
		User
			.destroy({ where: { id: id } })
			.then(data => resolve(true))
			.catch(err => resolve(false))
	})
}

/**
 * 以邮箱模糊搜索用户信息
 * @param {string} email 用户邮箱
 */
const searchUser = async (email) => {
	return new Promise(async (resolve, reject) => {
		User
			.findAll({ where: { email: { [Op.like]: `%${email}%` } } })
			.then(data => resolve(data))
			.catch(err => resolve(false))
	})
}

module.exports = {
	checkPassword,
	addUser,
	updateUser,
	getUserInfo,
	deleteUser,
	searchUser
}