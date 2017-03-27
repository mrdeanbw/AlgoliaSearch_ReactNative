'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.token);

// When a user deletes there account, clean up after them
const cleanupUser = functions.auth.user().onDelete(event => {
  const uid = event.data.uid;

  return admin.database().ref(`/users/${uid}`).once('value')
    .then(snapshot => snapshot.val())
    .then(user => stripe.customers.del(user.stripeCustomer))
    .then(() => admin.database().ref(`/users/${uid}/stripeCustomer`).remove())
});

module.exports = cleanupUser
