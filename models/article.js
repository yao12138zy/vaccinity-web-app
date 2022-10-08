/* Article model */
"use strict";

const mongoose = require("mongoose");

// const SectionSchema = new mongoose.Schema({
//   sectionTitle: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
// });

// const ContentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
// });

const ArticleSchema = new mongoose.Schema({
  title1: {
    type: String,
    required: true,
  },
  // summary: {
  //   type: String,
  //   required: true,
  // },
  date: {
    // change to Date object once I figure out how to input that 
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content1: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
    required: true,
  },
  content2: {
    type: String,
    required: true,
  },
  title3: {
    type: String,
    required: true,
  },
  content3: {
    type: String,
    required: true,
  },
  content4: {
    type: String,
    required: true,
  },

});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = { Article };
