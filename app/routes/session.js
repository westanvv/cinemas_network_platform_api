const express = require('express');
const router = express.Router();
const controller = require('../controllers/session');

router.get('/', controller.getAll);
router.get('/:id', controller.getElement);
router.post('/', controller.add);
router.delete('/:id', controller.del);

module.exports = router;
