const mongoose = require('mongoose')

const doctorschema = new mongoose.Schema({
    name: String,
    profession: String,
    dateofjoining:Date,
    bloodgroup:String,
    doctorid:String
});

const doctor = mongoose.model('doctor',doctorschema);

modules.export = doctor;
