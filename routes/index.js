const express = require('express');
const router = express.Router();
const auth = require('./auth');
const question = require('./question');
const answer = require('./answer');
const history = require('./history');
const biodata = require('./biodata');
const user = require('./user');

//capek banget
router.get('/', (_req, res) => {
  const result = {
    jsonapi: {
      version: '1.0'
    },
    meta: {
      author: 'Muhammad Umar Mansyur',
      copyright: '2022 ~ BE JavaScript Binar Academy'	
    },
  }
  res.status(200).json(result);
});


router.use('/', auth);
router.use('/user', user);
router.use('/question', question);
router.use('/answer', answer);
router.use('/history', history);
router.use('/biodata', biodata);

module.exports = router;