const express = require('express');
const router = express.Router();
const { isLogged } = require('../auth/authController');
const { user } = require('./userController');

router.get('/user', isLogged, user);

module.exports = router;
