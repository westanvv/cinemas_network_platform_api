const express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    test: '345345345'
  });
});

module.exports = router;
