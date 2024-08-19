const express = require('express');
const router = express.Router();
const {
  register,
  forgotPassword,
  login,
  isLogged,
  logOut,
  updateUserPassword,
} = require('./authController');

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.patch('/updatepassword', isLogged, updateUserPassword);
router.get('/logout', isLogged, logOut);

module.exports = router;
