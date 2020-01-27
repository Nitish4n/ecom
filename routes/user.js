const express = require('express');
const router = express.Router();

const { userById } = require("../app/http/controllers/UserController");
const {requireSignIn, isAuth, isAdmin} = require('../app/http/controllers/AuthController');

router.get('/secret/:userId' , requireSignIn, isAuth , isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
})
router.param('userId', userById);


module.exports = router;