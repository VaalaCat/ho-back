var express = require('express');
var router = express.Router();
var checker = require('../utils/checker')
var apply = require('../utils/apply')
var config = require('../config-dev')
var users = require('../utils/users')
var jwt = require('jsonwebtoken')

router.post('/add', async (req, res, next) => {
  var params = req.body
  let token = typeof (req.headers.authorization) == 'undefined' ? '' : req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.secret, async (err, decode) => {
    if (err) {
      return res.status(401).json({ code: 1, msg: 'token is invalid' });
    } else {
      if (!checker.paramCheck(['did', 'atime'], params)) { return res.status(403).json({ code: 1, msg: '参数数量不足' }) }
      if (!checker.timeCheck()) { return res.status(403).json({ code: 1, msg: '预约时间格式不正确' }) }
      let tmpuser = JSON.parse(JSON.stringify(await users.getUserInfo({ id: params.did })))[0]
      if (typeof tmpuser == 'undefined' ? true : (tmpuser.role != 'doctor')) return res.status(403).json({ code: 1, msg: '没有找到该医生' })

      let tmpcheck = await apply.addApply({
        did: params.did,
        nid: JSON.parse(JSON.stringify(await users.getUserInfo({ email: decode.email })))[0].id,
        atime: params.atime,
        archivetime: '0',
      })
      if (tmpcheck) return res.status(200).json({ code: 0, msg: '预约成功' })
      else return res.status(403).json({ code: 1, msg: '预约失败' })
    }
  })
});

router.get('/show', async (req, res, next) => {
  let token = typeof (req.headers.authorization) == 'undefined' ? '' : req.headers.authorization.split(' ')[1]
  jwt.verify(token, config.secret, async (err, decode) => {
    if (err) { return res.status(401).json({ code: 1, msg: 'token is invalid' }) }
    else {
      let tmpuser = JSON.parse(JSON.stringify(await users.getUserInfo({ email: decode.email })))[0]
      let result
      if (tmpuser.role == 'doctor') result = JSON.parse(JSON.stringify(await apply.getDocApply(tmpuser.id)))
      else result = JSON.parse(JSON.stringify(await apply.getNmlApply(tmpuser.id)))
      return res.json({ code: result.length > 0 ? 0 : 2, msg: result })
    }
  })
})

module.exports = router;
