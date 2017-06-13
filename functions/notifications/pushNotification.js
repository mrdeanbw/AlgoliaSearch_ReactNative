'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const types = require('./types');

const pushNotification = functions.database.ref('notifications').onWrite(event => {
  // Only new objects
  if (event.data.previous.exists()) {
    return;
  }

  const notification = event.data.val();
  const notificationId = event.data.key;

  if (notification.pushSent) {
    return;
  }

  const uid = notification.uid;
  admin.databas().ref(`users/${uid}/FCMToken`).once('value', tokenSnapshot => {
    const token = tokenSnapshot.val();

    admin.database().ref(`userNotifications/${uid}`).once('value')
      .then(userNotificationsSnapshot => {

        // Required for badge count
        const count = Object.keys(userNotificationsSnapshot.val())
          .filter(notification => notification.seen !== true).length;

        const type = notification.type;

        if (!token || !type) {
          console.log("no token or type", token, type)
          return;
        }

        const options = types[type];
        const payload = {
          to: token,
          notification: {
            title: options.title,
            body: options.body,
            badge: count,
          },
          priority: 'high', // always show notification
        }

        return admin.messaging().sendToDevice(token, payload).then(response => {
          admin.database.ref(`notifications/${notificationId}/pushSent`).set(true);
        });
      });
  });
});

module.exports = pushNotification;
