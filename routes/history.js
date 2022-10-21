const express = require('express');
const router = express.Router();
const middleware = require('../helpers/middleware');
const { history } = require('../controllers');


router.get('/', middleware.auth, history.getAll);
router.post('/', history.create);
router.put('/:id', history.update);
router.delete('/:id', history.delete);

module.exports = router;