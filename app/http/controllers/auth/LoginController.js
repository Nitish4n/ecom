const User = require('../../../models/Users');
const jwt = require('jsonwebtoken'); // to generate signed in token
const expressJwt = require('express-jwt'); //to check authenticated user token


const Login = (req, res) => {
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

module.exports = Login;
