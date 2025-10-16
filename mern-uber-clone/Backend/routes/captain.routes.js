const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller.js')
const authMiddleware = require('../middlewares/auth.middleware.js')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 character long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be atleast 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 chaxracter long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('color must be atleast 3 chaxracter long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('plate must be atleast 3 chaxracter long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('capacity can be atleast 1'),
    body('vehicle.vehicleType').isIn(["motorcycle", "auto", "car"]).withMessage('invalid vehicle type')
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 character long')
], captainController.loginCaptain);

router.post('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);
router.post('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;