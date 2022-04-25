const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please provide name'], minLength: 3, maxLength: 100},
    email: {type: String, required: [true, 'Please provide email'], 
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
            'Please provide valid email',
        ], unique: true,
    },
    password: {type: String, required: [true, 'Please provide password']}

})
// hash passwords
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
})
// create token
UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET , {expiresIn: '30d'});
}
// compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema)
