const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

// check token user
const authenToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // attach the user to the job routes
        req.user = {userId: payload.userId, name: payload.name};
        next();
    } catch (err) {
        throw new UnauthenticatedError('Authentication invalid') 
    }
}

module.exports = authenToken