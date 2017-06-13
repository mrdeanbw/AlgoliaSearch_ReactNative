'use strict';

const functions = require('firebase-functions');

const getUserPromise = require('../utils/getUserPromise');
const stripe = require('stripe')(functions.config().stripe.token);

const getCards = functions.https.onRequest((req, res, next) => {
  const userId = req.query.userId;

  getUserPromise(userId)
    .then(user => {
      if (!user.stripeCustomer) {
        return Promise.reject({message: 'Stripe customer not found'});
      }

      return stripe.customers.retrieve(user.stripeCustomer);
    })
    .then(response => res.send(response))
    .catch(err => {
      console.error(err)
      res.send(400, {message: err});
    })
})

module.exports = getCards;
