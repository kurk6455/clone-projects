const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller.js')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 character long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be atleast 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 character long')
], userController.registerUser);


module.exports = router;