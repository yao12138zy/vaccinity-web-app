/* User model */
"use strict";

const mongoose = require("mongoose");

const Country = new mongoose.Schema({
    name: String
}); 
const Gender = new mongoose.Schema({
    name: String
});

const VaccinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    effectiveTime: {
        type: Number,
        unique: false,
    },     
    info: {
        type: String,
        minlength: 1,
        trim: true,
        unique: false,
    },
    recommendedCountry: [Country],
    recommendedGender: [Gender]
});




// make a model using the User schema
const Vaccine = mongoose.model("Vaccine", VaccinationSchema);
module.exports = { Vaccine };
