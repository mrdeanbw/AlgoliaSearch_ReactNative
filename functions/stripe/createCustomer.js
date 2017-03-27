'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.token);

// When a user is created, register them with Stripe
const createCustomer = functions.auth.user().onCreate(event => {
  const data = event.data;
  const userId = data.uid;

  return stripe.customers.create({
    email: data.email,
    metadata: {
      userId: userId
    }
  }).then(customer => {
    return admin.database().ref(`/users/${userId}/stripeCustomer`).set(customer.id);
  });
});

module.exports = createCustomer
