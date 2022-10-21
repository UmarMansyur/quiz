const express = require('express');
const router = express.Router();
const middleware = require('../helpers/middleware');
const { auth } = require('../controllers');


router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/saya', middleware.auth, auth.saya);


module.exports = router;