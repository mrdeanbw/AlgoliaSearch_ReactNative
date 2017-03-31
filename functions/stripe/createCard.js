'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.token);

const createCard = functions.https.onRequest((req, res, next) => {
  const userId = req.body.userId;
  const cardToken = req.body.cardToken;

  if (!userId) {
    res.send(400, 'No userId provided');
  }

  if (!cardToken) {
    res.send(400, 'No cardToken provided');
  }

  admin.database().ref(`/users/${userId}`).once('value')
    .then(snapshot => snapshot.val())
    .then(user => {
      if (!user) {
        res.send(404, 'User not found');
      }

      const stripeCustomer = user.stripeCustomer
      if (!stripeCustomer) {
        res.send(404, 'Stripe account not found')
      }

      return stripe.customers.createSource(stripeCustomer, {
        source: cardToken,
      });
    })
    .then(response => {
      res.send(response)
    })
})

module.exports = createCard;
