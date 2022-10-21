const express = require('express');
const router = express.Router();
const {question} = require('../controllers');

router.get('/', question.getAll);
router.post('/', question.create);
router.put('/:id', question.update);
router.delete('/:id', question.delete);



module.exports = router;