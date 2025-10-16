const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//User Schema
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: { type: String, required: true, min: [3, "first name must be atleast 3 character long"] },
        lastname: { type: String, min: [3, "last name must be atleast 3 character long"] }
    },
    email: {
        type: String, requried: true, unique: true, min: [5, "email must be atleast 5 character long"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
})


// User Authentication related methods (instance vs statics methods)
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;