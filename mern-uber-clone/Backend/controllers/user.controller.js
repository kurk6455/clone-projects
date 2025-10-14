const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("validation successful")

    //If validated extract req.body
    const { fullname, email, password } = req.body;
    console.log(req.body);

    //Check if the user already exists or not
    const isUser = await userModel.findOne({ 'email': email });
    if (isUser) {
        return res.status(400).json({ message: "email already exists" });
    }

    //User is a new User -->
    //hash-password
    const hashedPassword = await userModel.hashPassword(password);
    //store it in db
    const user = await userService.createUser({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password: hashedPassword
    });
    //generate token
    const token = user.generateAuthToken();
    res.status(201).json({ token, user })
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    //Find if the user exists or not (with email&password)
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).json({ message: "invalid email : user not found" })
    }
    //Find if the password match or not
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        return res.status(400).json({ message: "invalid password" })
    }

    const token = await user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user });
}

module.exports.getUserProfile = (req, res, next) => {
    return res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');

    const token = req.cookies.token|| req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({ token });

    return res.status(200).json({ mesage: "logout successful" })
}