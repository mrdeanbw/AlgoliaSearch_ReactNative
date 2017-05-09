'use strict';

const functions = require('firebase-functions');

const getUserPromise = require('./utils/getUserPromise');
const stripe = require('stripe')(functions.config().stripe.token);

const createCard = functions.https.onRequest((req, res, next) => {
  const userId = req.body.userId;
  const cardToken = req.body.cardToken;

  if (!cardToken) {
    res.send(400, {message: 'No cardToken provided'});
  }

  getUserPromise(userId)
    .then(user => {
      if (!user.stripeCustomer) {
        return Promise.reject({message: 'Stripe customer not found'});
      }

      return stripe.customers.createSource(user.stripeCustomer, {
        source: cardToken,
      });
    })
    .then(response => {
      console.log('Stripe Response', stripeResponse);
      res.send(stripeResponse);
    })
    .catch(err => {
      console.err(err.message)
      res.send(400, {message: err.message});
    })
})

module.exports = createCard;
