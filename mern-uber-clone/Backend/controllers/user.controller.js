const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');

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