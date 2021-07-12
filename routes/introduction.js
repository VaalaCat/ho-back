var express = require('express');
var router = express.Router();
var introduction = require('../utils/introduction');
var users = require('../utils/users');

router.get('/', async (req, res, next) => {
	var params = req.query
	if (typeof params.aff !== 'undefined') {
		let result = JSON.parse(JSON.stringify(await introduction.getAffIntroduction(params.aff)))
		for (let i = 0; i < result.length; i++) {
			result[i].name = (await users.getUserInfo({ id: result[i].did }))[0].name
		}
		return res.send({ code: result.length == 0 ? 2 : 0, msg: result });
	} else {
		return res.send({ code: 0, msg: await introduction.getAff() });
	}
})

router.get('/all', async (req, res, next) => {
	let alldoc = JSON.parse(JSON.stringify(await users.getUserInfo({ role: 'doctor' })))
	let ans = {}
	for (let i = 0; i < alldoc.length; i++) {
		ans[alldoc[i].name] = alldoc[i].id
	}
	return res.send({ code: 0, msg: ans })
})

module.exports = router;
