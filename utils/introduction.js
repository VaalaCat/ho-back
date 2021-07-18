const model = require('../model.js')

let Introduction = model.Introduction

/**
 * 用于添加医生的详细介绍
 * @param {object} introduction 
 * @param {string} introduction.did 该医生的uid
 * @param {string} introduction.info 介绍详情
 * @param {string} introduction.aff 医生科室
 * @returns true:success/false:error
 */
let addIntroduction = async (introduction) => {
	return new Promise(async (resolve, reject) => {
		Introduction
			.create(introduction)
			.then(data => resolve(true))
			.catch(err => resolve(false))
	})
}

/**
 * 用于更新医生的详细介绍和科室，保证医生uid存在
 * @param {object} introduction 
 * @param {string} introduction.did 医生uid
 * @returns true:success/false:error
 */
let updateIntroduction = async (introduction) => {
	return new Promise(async (resolve, reject) => {
		Introduction
			.update(introduction, { where: { did: introduction.did } })
			.then(data => resolve(true))
			.catch(err => resolve(false))
	})
}

/**
 * 用于删除医生介绍
 * @param {string} did
 * @returns true:success/false:error
 */
let removeIntroduction = async (did) => {
	return new Promise(async (resolve, reject) => {
		Introduction
			.destroy({ where: { did: did } })
			.then(data => { if (data.length > 0) resolve(true); else resolve(false) })
			.catch(err => resolve(false))
	})
}

/**
 * 用于获取某科室的医生简介
 * @param {string} aff
 * @returns []
 */
let getAffIntroduction = async (aff) => {
	return new Promise(async (resolve, reject) => {
		Introduction
			.findAll({ attributes: ['did', 'info'], where: { aff: aff } })
			.then(data => resolve(data))
			.catch(err => resolve(false))
	})
}
/**
 * 用于获取所有的Aff
 * @returns []
 */
let getAff = async () => {
	return new Promise(async (resolve, reject) => {
		let tmp = JSON.parse(JSON.stringify(await Introduction.findAll({ attributes: ['aff'] })))
		let ans = []
		for (let i in tmp) {
			if (ans.indexOf(tmp[i].aff) === -1) {
				ans.push(tmp[i].aff)
			}
		}
		resolve(ans)
	})
}

module.exports = {
	addIntroduction,
	updateIntroduction,
	removeIntroduction,
	getAffIntroduction,
	getAff
}