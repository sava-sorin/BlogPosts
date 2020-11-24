// src / config / index.js
'use strict'

const config = {
  port: 5001,
  secret: 'super-secret-key',
  databaseUrl: 'mongodb+srv://adminDB:adminDB1234@cluster0.rhkql.mongodb.net/blogdb?retryWrites=true&w=majority',
  saltRounds: 10
}

module.exports = config;
