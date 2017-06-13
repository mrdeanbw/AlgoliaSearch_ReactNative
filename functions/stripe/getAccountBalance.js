'use strict';

const functions = require('firebase-functions');

const getUserPromise = require('../utils/getUserPromise');
const stripe = require('stripe')(functions.config().stripe.token);

const getAccountBalance = functions.https.onRequest((req, res, next) => {
  const userId = req.query.userId;

  getUserPromise(userId)
    .then(user => {
      if (!user.stripeAccount) {
        return Promise.reject({message: 'Stripe account not found'});
      }

      return stripe.balance.retrieve({
        stripe_account: user.stripeAccount
      });
    })
    .then(stripeResponse => {
      console.log('Stripe Response', stripeResponse);
      res.send(stripeResponse);
    })
    .catch(err => {
      console.error(err);
      res.send(400, {message: err});
    })
})

module.exports = getAccountBalance;
