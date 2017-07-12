'use strict';

const functions = require('firebase-functions');

const recurEvent = require('./recurEvent');

const recurEventHttp = functions.https.onRequest((req, res, next) => {
  recurEvent().then(() => {
    res.send({});
  });
})

module.exports.recurEventHttp = recurEventHttp;
