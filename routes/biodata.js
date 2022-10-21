const express = require('express');
const router = express.Router();
const { biodata } = require('../controllers');
const middleware = require('../helpers/middleware');



router.get('/', biodata.getAll);
router.post('/', middleware.auth, biodata.create);
router.put('/:id', biodata.update);
router.delete('/:id', biodata.delete);


module.exports = router;