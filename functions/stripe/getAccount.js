'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.token);

const getAccount = functions.https.onRequest((req, res, next) => {
  const userId = req.query.userId;

  if (!userId) {
    res.send(400, 'No UserId provided');
  }

  admin.database().ref(`/users/${userId}`).once('value')
    .then(snapshot => snapshot.val())
    .then(user => {
      const stripeAccount = user.stripeAccount
      stripe.accounts.retrieve(stripeAccount)
        .then(response => res.send(response))
        .catch(err => res.send(500, err));
    })
});

module.exports = getAccount
