'use strict';

const functions = require('firebase-functions');

const getUserPromise = require('../utils/getUserPromise');
const stripe = require('stripe')(functions.config().stripe.token);

const deleteCard = functions.https.onRequest((req, res, next) => {
  const userId = req.body.userId;
  const cardToken = req.body.cardToken;

  if (!cardToken) {
    res.send(400, {message: 'No cardToken provided'});
  }

  getUserPromise(userId)
    .then(user => {
      if (!user.stripeCustomer) {
        return Promise.reject({message: 'Stripe customer account not found'})
      }
      return stripe.customers.deleteSource(user.stripeCustomer, cardToken);
    })
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      console.error(err);
      res.send(400, {message: err});
    })
})

module.exports = deleteCard;
