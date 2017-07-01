const express = require('express');
const router = express.Router();
const controller = require('../controllers/film');

router.get('/', controller.getAll);
router.get('/:id', controller.getElement);
router.post('/', controller.add);
router.put('/:id', controller.update);
router.delete('/:id', controller.del);
router.post('/:id/parse', controller.parse);

module.exports = router;
