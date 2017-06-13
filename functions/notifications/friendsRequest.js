'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const types = require('./types');

const friendsRequest = functions.database.ref('friendRequests/{friendRequestsId}').onWrite(event => {
  // Only new objects
  if (event.data.previous.exists()) {
    return;
  }

  const request = event.data.val()
  const notification = admin.database().ref('notifications').push();
  const uid = request.toId;

  admin.database().ref('/').update({
    [`notifications/${notification.key}`]: {
      date: new Date(),
      read: false,
      type: types.FRIEND_REQUEST.key,
      friendRequestId: event.data.key,
      uid: uid,
    },
    [`userNotifications/${uid}/${notification.key}`]: true,
  });
});

module.exports = friendsRequest;
