// src / routes / user.js
'use strict'

// Imports
const express = require('express');
const isEmpty = require('lodash/isEmpty');

// App Imports
const config = require('../config');
let authMiddleware = require('./middlewares/auth');
let Post = require('../models/post');
const { request } = require('express');

// Common Routes
let postRoutes = express.Router();

// Posts (/posts)
postRoutes.get('/posts', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: [],
    errors: []
  };

  Post.find({}).sort('-createdAt').exec(function (error, documents) {
    if (documents.length > 0) {
      responseData.data = documents
      responseData.success = true
    }

    response.json(responseData);
  });
})

// Post Add (/post/add)
postRoutes.post('/post/add', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  };

  if (!isEmpty(request.user)) {
    if (request.body.title != '' && request.body.text != '') {
      let post = {
        title: request.body.title,
        text: request.body.text,
        userId: request.user._id,
        createdAt: new Date()
      };

      Post.create(post, (error, document) => {
        if (error) {
          responseData.errors.push({type: 'critical', message: error});
        } else {
          let postId = document._id;

          if (postId) {
            responseData.data.postId = postId;
            responseData.success = true;
          } else {
            responseData.errors.push({type: 'default', message: 'Please try again.'});
          }
        }

        response.json(responseData);
      })
    } else {
      responseData.errors.push({type: 'warning', message: 'Please enter blog post.'});

      response.json(responseData);
    }
  } else {
    responseData.errors.push({type: 'critical', message: 'You are not signed in. Please sign in to post a blog post.'});

    response.json(responseData);
  }
})

// Single Posts (/post/postId)
postRoutes.get('/post/:postId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  };

  if (request.params.postId) {
    Post.find({_id: request.params.postId}).exec(function (error, documents) {
      if (documents && documents.length > 0) {
        responseData.data = documents[0]
        responseData.success = true
      }

      response.json(responseData);
    });
  } else {
    response.json(responseData);
  }
})

// Personal Posts (/my-posts)
postRoutes.get('/my-posts', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: [],
    errors: []
  };

  Post.find({userId: request.user._id}).sort('-createdAt').exec(function (error, documents) {
    if (documents.length > 0) {
      responseData.data = documents
      responseData.success = true
    }

    response.json(responseData);
  });
})

// Update Personal Post (/edit)
postRoutes.put('/edit/:postId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    errors: []
  };

  let post = {
    title: request.body.title,
    text: request.body.text,
    lastModified: new Date()
  };

  if (request.params.postId) {
    Post.update(
      { _id: request.params.postId },
      { $set : post },
      { upsert: true },
      function(error,documents) {
      if (error) {
        return error.message;
      }
      responseData.success = true;
      response.json(responseData);
    })
  } else {
    response.json(responseData);
  }
})

// Delete Personal Post (/delete)
postRoutes.get('/delete/:postId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: [],
    errors: []
  };

  if (request.params.postId) {
    Post.find({_id: request.params.postId}).remove().exec(function (error, documents) {
      responseData.success = true;
    });
  } 
  response.json(responseData);
})

// Export
module.exports = postRoutes;
