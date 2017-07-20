'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const types = require('./types');
const getEventPromise  = require('../utils/getEventPromise');

const eventRequest = functions.database.ref('requests/{requestId}').onWrite(event => {

  // Only new objects
  if (event.data.previous.exists()) {
    return;
  }

  const request = event.data.val();
  const notification = admin.database().ref('notifications').push();

  getEventPromise(request.eventId)
    .then((eventData) => {
      admin.database().ref('/').update({
        [`notifications/${notification.key}`]: {
          date: new Date(),
          read: false,
          type: 'EVENT_REQUEST',
          requestId: event.data.key,
          uid: eventData.organizer,
        },
        [`userNotifications/${eventData.organizer}/${notification.key}`]: true,
      });
    })
})

module.exports = eventRequest;
