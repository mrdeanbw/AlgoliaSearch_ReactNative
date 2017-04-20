'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.token);

const currency = functions.config().stripe.currency || 'GBP';
const country = 'GB';
const fee = 50;

const chargeCard = functions.https.onRequest((req, res, next) => {
  const cardId = req.body.cardId;
  const eventId = req.body.eventId;
  const inviteId = req.body.inviteId;
  const userId = req.body.userId;

  let user, organizer, event;

  Promise.all([
    admin.database().ref(`/events/${eventId}`).once('value'),
    admin.database().ref(`/users/${userId}`).once('value')
  ]).then(values => {
    event = values[0].val();
    user = values[1].val();

    // Get the Organizer user object
    return admin.database().ref(`/users/${event.organizer}`).once('value');
  }).then(organizerResult => {
    organizer = organizerResult.val();

    const  chargeData = {
      amount: (event.entryFee * 100) + fee,
      application_fee: fee,
      currency: currency,
      customer: user.stripeCustomer,
      source: cardId,
      description: 'Made via hoops-stripe server',
      destination: organizer.stripeAccount,
    };

    return stripe.charges.create(chargeData)
  }).then(stripeResult => {
    if (inviteId) {
      /*
       * If inviteId is defined, this payment is a response to an invitation from an
       * event organiser.
       * Once payment is processed, we must confirm the invite.
       */
      return admin.database().ref(`invites/${inviteId}/status`).set('confirmed')
    } else {
      const requestRef = admin.database().ref('requests').push();
      const requestKey = requestRef.key;
      const requestData = {
        eventId: event.id,
        userId,
        status: event.privacy === 'public' ? 'confirmed' : 'pending',
        date: new Date(),
        paymentMethod: 'app',
      }

      return admin.database().ref('/').update({
        [`events/${event.id}/requests/${requestKey}`]: true,
        [`users/${userId}/requests/${requestKey}`]: true,
        [`requests/${requestKey}`]: requestData,
      })
    }
  }).then(stripeResult => {
    res.send(stripeResult);
  }).catch(err => {
    res.send(500, err);
  })

})

module.exports = chargeCard;
