'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const types = require('./types');

const eventInvite = functions.database.ref('invites/{inviteId}').onWrite(event => {

  // Only new objects
  if (event.data.previous.exists()) {
    return;
  }

  const invite = event.data.val();
  const notification = admin.database().ref('notifications').push();

  admin.database().ref('/').update({
    [`notifications/${notification.key}`]: {
      date: new Date(),
      read: false,
      type: 'EVENT_INVITE',
      inviteId: event.data.key,
      uid: invite.userId,
    },
    [`userNotifications/${invite.userId}/${notification.key}`]: true,
  });

})

module.exports = eventInvite;
