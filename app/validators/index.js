exports.userSignUpValidator = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    req.check('name', 'Name is Required').notEmpty();
    req.check('email', 'Email must be less then 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contains @")
        .isLength({
            min:4, max:32
        })
    req.check("password", "Password Can not be empty").notEmpty()
    req.check("password").isLength({
        min:5
    })
    .withMessage("Password must atleast 5 characters")


    const errors = req.validationErrors()

    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError})
    }

    next()
}