const express = require('express');
const router = express.Router();
const controller = require('../controllers/default');

router.get('/', controller.getAppInfo);

module.exports = router;
