const User = require('../../../models/Users');
const { errorHandler } = require('../../../helpers/dbErrorHandler');

const Register = (req, res) => {
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

module.exports = Register;