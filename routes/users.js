var express = require('express');
var router = express.Router();
var users = require('../utils/users')
var jwt = require('jsonwebtoken')
var config = require('../config-dev')

router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/info', async (req, res, next) => {
	let token = typeof (req.headers.authorization) == 'undefined' ? '' : req.headers.authorization.split(' ')[1]
	jwt.verify(token, config.secret, async (err, decode) => {
		if (err) { return res.status(401).json({ code: 1, msg: 'token is invalid' }) }
		else {
			return res.status(200).json({ code: 0, msg: await users.getUserInfo({ email: decode.email }) })
		}
	})
})

module.exports = router;
