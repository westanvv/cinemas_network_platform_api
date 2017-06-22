const express = require('express');
const router = express.Router();
const controller = require('../controllers/film');

// router.get('/', controller.getAll);
router.get('/', controller.addElement);
router.get('/:id', controller.getElement);

module.exports = router;
