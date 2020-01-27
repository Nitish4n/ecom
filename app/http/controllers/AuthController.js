const User = require('../../models/Users');
const { errorHandler } = require('../../helpers/dbErrorHandler');
require('dotenv').config();
const jwt = require('jsonwebtoken'); // to generate signed in token
const expressJwt = require('express-jwt'); //to check authenticated user token

exports.Register = (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json(
                errorHandler(err)
            )
        }

        user.salt = undefined
        user.hashed_password = undefined

        res.json({user})
    })
}


exports.Login = (req, res) => {
    const { email , password } = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                err : "User Not Exist"
            })
        }

        //if user found

        //create authenticate method in model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password not matched"
            });
        } 

        //generate token
        const token = jwt.sign({_id: user._id}, process.env.JWTSecret)

        //persist token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999999})

        const { _id, name , email, role} = user

        return res.json({token, user: { _id, name , email, role }})
    })
}


exports.Logout = (req, res) => {
    res.clearCookie('t')
    res.json({message: 'User Successfully Logged Out'});
}


exports.requireSignIn = expressJwt({
    secret : process.env.JWTSecret,
    userProperty: "auth"
});


exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;

    if(!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }

    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Not Admin !!! Access Denied"
        })
    }

    next();
}