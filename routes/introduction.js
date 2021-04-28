var express = require('express');
var router = express.Router();
var introduction = require('../utils/introduction');

router.get('/', async (req, res, next) => {
  var params = req.query
  if (typeof params.aff !== 'undefined') {
    let result = await introduction.getAffIntroduction(params.aff)
    return res.send({ code: result.length == 0 ? 2 : 0, msg: result });
  } else {
    return res.send({ code: 0, msg: await introduction.getAff() });
  }
})

module.exports = router;
