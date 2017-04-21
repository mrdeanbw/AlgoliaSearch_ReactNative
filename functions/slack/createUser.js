'use strict';

const functions = require('firebase-functions');

const utils = require('./utils')

const createUser = functions.auth.user().onCreate(event => {
  const user = event.data;
  return utils.postToSlack(`New user created: ${user.email}`)
});

module.exports = createUser;
