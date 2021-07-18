var express = require('express');
var router = express.Router();
var checker = require('../utils/checker')
var apply = require('../utils/apply')
var config = require('../config-dev')
var users = require('../utils/users')
var introduction = require('../utils/introduction')
var md5 = require('md5')
var jwt = require('jsonwebtoken')

router.post('/modifypassword', async (req, res, next) => {
	let params = req.body
	let token = typeof (req.headers.authorization) == 'undefined' ? '' : req.headers.authorization.split(' ')[1]
	jwt.verify(token, config.secret, async (err, decode) => {
		if (err) { return res.status(401).json({ code: 1, msg: 'token is invalid' }) }
		else {
			let tmpuser = JSON.parse(JSON.stringify(await users.getUserInfo({ email: decode.email })))[0]
			if (tmpuser.role != 'admin') {
				return res.status(403).json({ code: 1, msg: '您没有操作该条目的权限' })
			}

			if (!checker.paramCheck(['email', 'passwd'], params)) { return res.status(403).json({ code: 1, msg: '参数数量不足' }) }

			users.updateUser({
				email: params.email,
				passwd: md5(md5(params.passwd))
			})
		}
	})
})

router.post('/deleteuser', async (req, res, next) => {
	let params = req.body
	let token = typeof (req.headers.authorization) == 'undefined' ? '' : req.headers.authorization.split(' ')[1]
	jwt.verify(token, config.secret, async (err, decode) => {
		if (err) { return res.status(401).json({ code: 1, msg: 'token is invalid' }) }
		else {
			let tmpuser = JSON.parse(JSON.stringify(await users.getUserInfo({ email: decode.email })))[0]
			if (tmpuser.role != 'admin') {
				return res.status(403).json({ code: 1, msg: '您没有操作该条目的权限' })
			}

			if (!checker.paramCheck(['email'], params)) { return res.status(403).json({ code: 1, msg: '参数数量不足' }) }

			let findedUser = JSON.parse(JSON.stringify(await users.getUserInfo({ email: params.email })))

			if (findedUser.length) {
				if (findedUser[0].role == 'admin') { return res.json({ code: 1, msg: '不能删除管理员，请先将管理员修改为普通用户' }) }
				users.deleteUser(findedUser[0].id)
				let applys = await apply.getDocApply(findedUser[0].id)
				if (!applys.length) {
					applys = await apply.getNmlApply(findedUser[0].id)
				}
				for (let i of applys) {
					apply.removeApply(i)
				}
				if (findedUser[0].role == 'doctor') {
					introduction.removeIntroduction(findedUser[0].id)
				}
				return res.json({ code: 0, msg: 'success' })
			} else {
				return res.json({ code: 1, msg: '没有找到该用户' })
			}
		}
	})
})

router.post('/modify', async (req, res, next) => {
	let params = req.body
	let token = typeof (req.headers.authorization) == 'undefined' ? '' : req.headers.authorization.split(' ')[1]
	jwt.verify(token, config.secret, async (err, decode) => {
		if (err) { return res.status(401).json({ code: 1, msg: 'token is invalid' }) }
		else {
			let tmpuser = JSON.parse(JSON.stringify(await users.getUserInfo({ email: decode.email })))[0]
			if (tmpuser.role != 'admin') { return res.status(403).json({ code: 1, msg: '您没有操作该条目的权限' }) }

			if (!checker.paramCheck(['email'], params)) { return res.status(403).json({ code: 1, msg: '参数数量不足' }) }

			if (checker.paramCheck(['passwd'], params)) { return res.status(403).json({ code: 1, msg: '密码请在修改密码处修改' }) }

			let findedUser = JSON.parse(JSON.stringify(await users.getUserInfo({ email: params.email })))

			if (findedUser.length) {
				await users.updateUser(params)
				if (findedUser[0].role == 'doctor') {
					introduction.updateIntroduction({
						did: params.id,
						info: params.info,
						aff: params.aff
					})
					introduction.addIntroduction({
						did: params.id,
						info: params.info,
						aff: params.aff
					})
				}
				console.log(findedUser[0].role)
				return res.json({ code: 0, msg: 'success' })
			} else {
				return res.json({ code: 1, msg: '没有找到该用户' })
			}
		}
	})
})

router.post('/search', async (req, res, next) => {
	let params = req.body
	let token = typeof (req.headers.authorization) == 'undefined' ? '' : req.headers.authorization.split(' ')[1]
	jwt.verify(token, config.secret, async (err, decode) => {
		if (err) { return res.status(401).json({ code: 1, msg: 'token is invalid' }) }
		else {
			let tmpuser = JSON.parse(JSON.stringify(await users.getUserInfo({ email: decode.email })))[0]
			if (tmpuser.role != 'admin') { return res.status(403).json({ code: 1, msg: '您没有操作该条目的权限' }) }

			if (!checker.paramCheck(['email'], params)) { return res.status(403).json({ code: 1, msg: '参数数量不足' }) }

			let findedUser = JSON.parse(JSON.stringify(await users.searchUser(params.email)))
			if (findedUser.length) {
				return res.json({ code: 0, msg: JSON.stringify(findedUser) })
			} else {
				return res.json({ code: 1, msg: '没有找到该用户' })
			}
		}
	})
})

router.post('/changepwd', async (req, res, next) => {
	let params = req.body
	let token = typeof (req.headers.authorization) == 'undefined' ? '' : req.headers.authorization.split(' ')[1]
	jwt.verify(token, config.secret, async (err, decode) => {
		if (err) { return res.status(401).json({ code: 1, msg: 'token is invalid' }) }
		else {
			if (!checker.paramCheck(['newPasswd', 'oldPasswd'], params)) { return res.status(403).json({ code: 1, msg: '参数数量不足' }) }
			if (await users.checkPassword(decode.email, params.oldPasswd)) { return res.status(403).json({ code: 1, msg: '密码错误' }) }

			users.updateUser({
				email: decode.email,
				passwd: md5(md5(params.newPasswd))
			})
			return res.json({ code: 0, msg: 'success' })
		}
	})
})

router.get('/check', async (req, res, next) => {
	let token = typeof (req.headers.authorization) == 'undefined' ? '' : req.headers.authorization.split(' ')[1]
	jwt.verify(token, config.secret, async (err, decode) => {
		if (err) { return res.status(401).json({ code: 1, msg: 'token is invalid' }) }
		else {
			let tmpuser = JSON.parse(JSON.stringify(await users.getUserInfo({ email: decode.email })))[0]
			if (tmpuser.role == 'admin') return res.status(200).json({ code: 0, msg: 'admin' })
			else return res.status(403).json({ code: 1, msg: 'error' })
		}
	})
})

module.exports = router;