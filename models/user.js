/* User model */
"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const vaccine = require("./vaccine");

const AddressSchema = mongoose.Schema({
  address1: String,
  address2: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
});

const VaccinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    
  },
  dateofVaccination: {
    type: Date,
    unique: false,
    required: true,
  },
});

const BookingHistorySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: true,
  },
  temp_phoneNum: {
    type: String,
    required: true
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Not a valid email address",
    },
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  phoneNum: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  healthCardNum: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  passportNum: {
    type: String,
    trim: true,
  },
  addressBook: [AddressSchema],
  vaccinationHistory: [VaccinationSchema],
  bookingHistory: [BookingHistorySchema],
});

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre("save", function (next) {
  const user = this; // binds this to User document instance

  // checks to ensure we don't hash password more than once
  if (user.isModified("password")) {
    // generate salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function (username, password) {
  const User = this; // binds this to the User model

  // First find the user by their username
  return User.findOne({ username: username }).then((user) => {
    if (!user) {
      return Promise.reject("usernameNotExist"); // a rejected promise
    }
    // if the user exists, make sure their password is correct
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject("incorrectPassword");
        }
      });
    });
  });
};

// make a model using the User schema
const User = mongoose.model("User", UserSchema);
module.exports = { User };
