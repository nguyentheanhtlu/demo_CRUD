const mongoose = require('../config/database')
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String

})

const User = mongoose.model('User', userSchema)

module.exports = User;
