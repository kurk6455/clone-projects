const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller.js')
const authMiddleware = require('../middlewares/auth.middleware.js')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 character long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be atleast 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 character long')
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 character long')
], userController.loginUser);

router.post('/profile', authMiddleware.authUser, userController.getUserProfile);
router.post('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;