const express = require('express');
const router = express.Router();
const controller = require('../controllers/hall');

router.get('/', controller.getAll);
router.get('/:id', controller.getElement);
router.post('/', controller.add);
router.put('/:id', controller.update);

module.exports = router;
