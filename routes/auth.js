const express = require('express');
const router = express.Router();
const RegisterController = require('../app/http/controllers/auth/RegisterController');
const LoginController = require('../app/http/controllers/auth/LoginController');


router.post('/signup', RegisterController);

module.exports = router;