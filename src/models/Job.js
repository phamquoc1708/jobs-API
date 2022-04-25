const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {type: String, require: [true, "Please prive company name"]},
    position: {type: String, require: [true, "Please prive posistion"]},
    status: {type: String, default: "pending"},
    createdBy: {type: mongoose.Types.ObjectId, ref: 'User', require: [true, "Please prive user"]},
}, {timestamps: true,})

module.exports = mongoose.model('Job', JobSchema)
