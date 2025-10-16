const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.authUser = async (req, res, next) => {
    //Extract user token
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(400).json({message : "invalid user"});
    }

    //Check if the user has been in blacklist
    const isBlackListed = await blackListTokenModel.findOne({token});
    if(isBlackListed){
        return res.status(400).json({message: "unauthorized"});
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decode._id);
        if(!user){
            return res.status(400).json({message : "invalid user"});
        }

        req.user = user;

        return next();
    }catch(e){
        res.status(401).json({message: 'unauthorized'});
    }
}

module.exports.authCaptain = async (req, res, next) => {
    //Extract captain token
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(400).json({message : "invalid captain"});
    }

    //Check if the captain has been in blacklist
    const isBlackListed = await blackListTokenModel.findOne({token});
    if(isBlackListed){
        return res.status(400).json({message: "unauthorized(logged out)"});
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Captain id : ",decode._id);

        const captain = await captainModel.findById(decode._id);
        if(!captain){
            return res.status(400).json({message : "invalid captain"});
        }

        req.captain = captain;

        return next();
    }catch(e){
        res.status(401).json({message: 'unauthorized'});
    }
}