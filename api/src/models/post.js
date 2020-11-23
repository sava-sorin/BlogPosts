// src / models / post.js
'use strict'

const mongoose = require('mongoose');

// Post Collection
let PostSchema = mongoose.Schema({
  title: String,
  text: String,
  userId: String,
  createdAt: Date,
  lastModified: Date
});

let Post = mongoose.model('posts', PostSchema);

module.exports = Post;
