'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.token);

const getCards = functions.https.onRequest((req, res, next) => {
  const userId = req.query.userId;
  if (!userId) {
    res.send(400, 'No UserId provided');
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

      return stripe.customers.retrieve(stripeCustomer);
    })
    .then(response => {
      console.log("response", response)
      res.send(response)
    })
    .catch(() => {
      res.send(500, response)
    })
})

module.exports = getCards;
