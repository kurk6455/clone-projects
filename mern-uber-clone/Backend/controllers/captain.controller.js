const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.registerCaptain= async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("validation successful")

    //If validated extract req.body
    const { fullname, email, password, vehicle } = req.body;
    console.log(req.body);

    //Check if the captain already exists or not
    const isCaptain = await captainModel.findOne({ 'email': email });
    if (isCaptain) {
        return res.status(400).json({ message: "email already exists" });
    }

    //Captain is a new captain -->
    //hash-password
    const hashedPassword = await captainModel.hashPassword(password);
    console.log("hashed password : ",hashedPassword);
    //store it in db
    const captain = await captainService.createCaptain({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    });
    //generate token
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain })
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    //Find -> if the captain exists or not (with email)
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
        return res.status(400).json({ message: "invalid email : captain not found" })
    }
    //Find -> if the password match or not
    const isMatch = await captain.comparePassword(password)
    if (!isMatch) {
        return res.status(400).json({ message: "invalid password" })
    }

    const token = await captain.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = (req, res, next) => {
    return res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token');

    const token = req.cookies.token|| req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({ token });

    return res.status(200).json({ mesage: "logout successful" })
}