const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    age: Number,
    location: String,
    blood: String,
    phone: String  // Change to String
});

const Usermodel = mongoose.model('user', Userschema);

module.exports = Usermodel;
