const userModel = require("../models/user.model")


module.exports.createUser = async ({ fullname, email, password }) => {
    if (!fullname || !email || !password) {
        throw new Error("all fields are requried");
    }

    const user = await userModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email, password
    });

    return user;
}