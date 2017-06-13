'use strict';

const admin = require('firebase-admin');

function getEventPromise(userId) {
  return new Promise((resolve, reject) => {
    if (!eventId || typeof eventId !== 'string') {
      reject('Invalid or missing eventId');
    }

    admin.database().ref(`/events/${eventId}`).once('value')
      .then(snapshot => snapshot.val())
      .then(event => {
        if (!event) {
          reject({message: 'Event not found'});
        }

        return resolve(event);
      })
  })
}

module.exports = getEventPromise;
