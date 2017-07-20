'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const types = require('./types');

const pushNotification = functions.database.ref('notifications/{notificationId}').onWrite(event => {
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
  admin.database().ref(`users/${uid}/FCMToken`).once('value', tokenSnapshot => {
    const token = tokenSnapshot.val();

    admin.database().ref(`userNotifications/${uid}`).once('value')
      .then(userNotificationsSnapshot => {

        // Required for badge count
        const count = Object.keys(userNotificationsSnapshot.val())
          .filter(notification => notification.seen !== true).length;

        const type = notification.type;

        if (!token || !type) {
          return;
        }

        const notificationType = types[type];

        const payload = {
          notification: {
            title: notificationType.title,
            body: notificationType.body,
            badge: count.toString(),
          }
        }

        const notificationOptions = {
          priority: 'high',
          timeToLive: 60 * 60 * 24,
        }

        return admin.messaging().sendToDevice(token, payload, notificationOptions).then(response => {
          admin.database().ref(`notifications/${notificationId}/pushSent`).set(true);
        });
      });
  });
});

module.exports = pushNotification;
