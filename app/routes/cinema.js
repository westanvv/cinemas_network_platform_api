const express = require('express');
const router = express.Router();
const controller = require('../controllers/cinema');

router.get('/', controller.getAll);
router.get('/:id', controller.getElement);
router.post('/', controller.add);
router.put('/:id', controller.update);

router.post('/:id/halls', controller.addHalls);
router.delete('/:id/halls', controller.delHalls);
router.get('/:id/halls', controller.getHalls);

router.get('/:id/films', controller.getFilms);

module.exports = router;
