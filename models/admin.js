/* Admin model */
"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const AddressSchema = mongoose.Schema({
  address1: String,
  address2: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
});

const BookingHistorySchema = new mongoose.Schema({
  userID: String,
  adminID: String,
  date: String,
  time: String,
});

const AdminSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  licenceNum: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  organization: {
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
  addressBook: [AddressSchema],
  bookingHistory: [BookingHistorySchema],
});

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
AdminSchema.pre("save", function (next) {
  const admin = this; // binds this to Admin document instance

  // checks to ensure we don't hash password more than once
  if (admin.isModified("password")) {
    // generate salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(admin.password, salt, (err, hash) => {
        admin.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// A static method on the document model.
// Allows us to find an Admin document by comparing the hashed password
//  to a given one, for example when logging in.
AdminSchema.statics.findByUsernamePassword = function (username, password) {
  const Admin = this; // binds this to the User model

  // First find the admin by their username
  return Admin.findOne({ username: username }).then((admin) => {
    if (!admin) {
      return Promise.reject(); // a rejected promise
    }
    // if the admin exists, make sure their password is correct
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, admin.password, (err, result) => {
        if (result) {
          resolve(admin);
        } else {
          reject();
        }
      });
    });
  });
};

// make a model using the User schema
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = { Admin };
