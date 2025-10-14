const userModel = require("../models/user.model")


module.exports.createUser = async ( {fullname, email, password}) => {
    const user = await userModel.create({
        fullname: {
            firstname : fullname.firstname,
            lastname: fullname.lastname
        },
        email, password
    });

    return user;
}