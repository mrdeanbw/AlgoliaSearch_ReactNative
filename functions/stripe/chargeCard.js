'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.token);

const currency = functions.config().stripe.currency || 'GBP';
const country = 'GB';
const entryFee = 50;

const chargeCard = functions.https.onRequest((req, res, next) => {
  const eventId = req.body.eventId;
  const inviteId = req.body.inviteId;
  const userId = req.body.userId;

  let user, organizer, event;

  Promise.all([
    admin.database().ref(`/events/${eventId}`).once('value'),
    admin.database().ref(`/users/${userId}`).once('value')
  ]).then(values => {
    event = values[0].val()
    user = values[1].val()

    // Get the Organizer user object
    return admin.database().ref(`/users/${event.organizer}`).once('value')
  }).then(organizerResult => {
    organizer = organizerResult.val()

    return stripe.charges.create({
      amount: entry + fee,
      application_fee: fee,
      currency: currency,
      source: cardId,
      customer: customerId,
      description: "Made via hoops-stripe server",
      destination: organizer.stripeAccount,
    });
  })

  res.send('all good');
})

module.exports = chargeCard;
