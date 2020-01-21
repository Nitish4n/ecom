const express = require('express');
const router = express.Router();
const {Register, Login, Logout, requireSignIn} = require('../app/http/controllers/AuthController');
const {userSignUpValidator} = require("../app/validators/index");


router.post('/signup', userSignUpValidator , Register);
router.post('/signin', Login); 
router.get('/signout', Logout);

router.get('/hello', requireSignIn, (req, res) => {
    res.send('hello ok')
})

module.exports = router;