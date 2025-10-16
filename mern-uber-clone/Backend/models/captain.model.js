const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//captain schema
const captainSchema = mongoose.Schema({
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
    },
    status: {
        type: String,
        required: true,
        enum : ['active', 'inactive'],
        default : 'inactive'
    },
    vehicle: {
        color : {
            type: String,
            required: true,
            min: [3, "Color must be atleast 3 character long"],
        },
        plate: {
            type: String,
            requried: true,
            min: [3, "Plate must be atleast 3 character long"],
        },
        capacity: {
            type: Number, 
            require: true,
            min: [1, "capacity must be minimum of 1"],
        },
        vehicleType : {
            type: String, 
            requried : true,
            enum: ["motorcycle", "auto", "car"],
        },
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

// User Authentication related methods (instance vs statics methods)
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captains', captainSchema);

module.exports = captainModel;