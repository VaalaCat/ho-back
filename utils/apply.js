const model = require('../model.js')

let Apply = model.Apply

/**
 * 用于新增挂号项目
 * @param {object} apply 
 * @param {string} apply.did 挂号医生的用户uid
 * @param {string} apply.nid 挂号患者的用户uid
 * @param {string} apply.atime 挂号时间
 * @param {string} apply.archivetime 该挂号请求处理时间
 * @returns true:success/false:error
 */
let addApply = async (apply) => {
    return new Promise(async (resolve, reject) => {
        Apply
            .create(apply)
            .then(data => resolve(true))
            .catch(err => resolve(false))
    })
}

/**
 * 用于更新挂号项目（更新已处理的挂号请求）
 * @param {object} apply 
 * @param {string} apply.id 挂号条目uid
 * @param {string} apply.archivetime 该挂号请求处理时间
 * @returns true:success/false:error
 */
let updateApply = async (apply) => {
    return new Promise(async (resolve, reject) => {
        Apply
            .update(apply, { where: { id: apply.id } })
            .then(data => resolve(true))
            .catch(err => resolve(false))
    })
}

/**
 * 用于删除挂号条目（删除或取消挂号）
 * @param {object} apply
 * @param {string} apply.id 挂号条目uid
 * @returns true:success/false:error
 */
let removeApply = async (apply) => {
    return new Promise(async (resolve, reject) => {
        Apply
            .delete({ where: { id: apply.id } })
            .then(data => resolve(true))
            .catch(err => resolve(false))
    })
}

/**
 * 查询用户（医生）挂号的所有条目
 * @param {string} did 医生uid
 * @returns 返回该用户的所有挂号条目
 */
let getDocApply = async (did) => {
    return new Promise(async (resolve, reject) => {
        Apply
            .findAll({ where: { did: did } })
            .then(data => resolve(data))
            .catch(err => resolve(false))
    })
}

/**
 * 查询用户（患者）挂号的所有条目
 * @param {string} nid 患者uid
 * @returns 返回该用户的所有挂号条目
 */
let getNmlApply = async (nid) => {
    return new Promise(async (resolve, reject) => {
        Apply
            .findAll({ where: { nid: nid } })
            .then(data => resolve(data))
            .catch(err => resolve(false))
    })
}

module.exports = {
    addApply,
    updateApply,
    removeApply,
    getDocApply,
    getNmlApply
}