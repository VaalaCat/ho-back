var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var users = require('../utils/users');
var config = require('../config-dev')
var md5 = require('md5')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/user')
});

router.post('/reg', async (req, res, next) => {
  let params = req.body
  let result = await users.addUser({
    name: params.name,
    passwd: md5(md5(params.passwd)),
    phone: params.phone,
    email: params.email,
    role: 'normal'
  })
  return res.send({ code: result, msg: result == true ? 'reg successful' : 'reg failed' })
});

router.post('/login', async (req, res, next) => {
  let params = req.body
  let result = await users.checkPassword(params.email, md5(md5(params.password)))
  if (result == true) {
    let token = jwt.sign(
      { email: params.email },
      config.secret,
      { expiresIn: config.expiresTime }
    )
    return res.send({ code: 1, msg: 'login successful', token: token })
  }
  else {
    return res.status(401).send({ code: 0, msg: 'login error' })
  }
})

router.all('/verify', async (req, res, next) => {
  let token = typeof (req.headers.authorization) == 'undefined' ? '' : req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.secret, async (err, decode) => {
    if (err) {
      return res.status(401).json({ code: 1, msg: 'token is invalid' });
    } else {
      token = jwt.sign({ email: decode.email }, config.secret, { expiresIn: config.expiresTime })
      return res.json({
        code: 1,
        msg: decode.email,
        token: token
      })
    }
  })
})

module.exports = router;