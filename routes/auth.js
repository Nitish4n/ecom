const express = require('express');
const router = express.Router();
const RegisterController = require('../app/http/controllers/auth/RegisterController');
const LoginController = require('../app/http/controllers/auth/LoginController');
const {userSignUpValidator} = require("../app/validators/index");


router.post('/signup', userSignUpValidator , RegisterController);
router.post('/signin', LoginController); 

module.exports = router;