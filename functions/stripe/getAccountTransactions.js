'use strict';

const functions = require('firebase-functions');

const getUserPromise = require('../utils/getUserPromise');
const stripe = require('stripe')(functions.config().stripe.token);

const getAccountTransactions = functions.https.onRequest((req, res, next) => {
  const userId = req.query.userId;
  let limitAmount = 0;

  if(req.query.limit){
      limitAmount = req.query.limit;
  }

  getUserPromise(userId)
    .then(user => {
      if (!user.stripeAccount) {
        return Promise.reject({message: 'Stripe account not found'});
      }
        return stripe.balance.listTransactions({ 
            stripe_account: user.stripeAccount,
            limit:  limitAmount
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

module.exports = getAccountTransactions;
