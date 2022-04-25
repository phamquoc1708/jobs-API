const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Successfully connected');
    } catch (err) {
        console.log('Error connecting');
    }
}

module.exports = {connect};
