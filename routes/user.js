const express = require('express');
const router = express.Router();
const middleware = require('../helpers/middleware');
const { auth } = require('../controllers');


router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/auth/login/google', auth.loginGoogle);
router.get('/auth/login/facebook', auth.loginFacebook);
router.get('/saya', middleware.auth, auth.saya);


module.exports = router;