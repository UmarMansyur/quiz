const express = require('express');
const router = express.Router();
const { answer } = require('../controllers');

router.get('/', answer.getAll);
router.post('/', answer.create);
router.put('/:id', answer.update);
router.delete('/:id', answer.delete);

module.exports = router;