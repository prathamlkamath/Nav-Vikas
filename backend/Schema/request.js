const mongoose = require('mongoose');

// Define the blood schema
const bloodSchema = mongoose.Schema({
    location: String,
    time: String,
    date: String,
    blood: String,
    unit: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } // Reference to Usermodel
});

// Create BloodModel
const bloodmodel = mongoose.model('blood', bloodSchema);

// Export BloodModel
module.exports = bloodmodel;
