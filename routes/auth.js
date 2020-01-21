const express = require('express');
const router = express.Router();
const {Register, Login, Logout} = require('../app/http/controllers/AuthController');
const LoginController = require('../app/http/controllers/auth/LoginController');
const {userSignUpValidator} = require("../app/validators/index");


router.post('/signup', userSignUpValidator , Register);
router.post('/signin', Login); 
router.get('/signout', Logout);

module.exports = router;