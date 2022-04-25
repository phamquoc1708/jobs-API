const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
// [POST] api/v1/auth/register
const register = async (req, res, next) => {
    const user = await User.create({...req.body});
    const token = await user.createJWT();
    
    res.status(StatusCodes.CREATED).json({ user : {name: user.name}, token});
}
// [POST] api/v1/auth/login
const login = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide a valid email and password');
    }
    const user = await User.findOne({email: email});
    if (!user) {
        throw new UnauthenticatedError('Invalid email');
    }
    const isPasswordCorrect = user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Your password is incorrect');
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {register, login};
