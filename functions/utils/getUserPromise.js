'use strict';

const admin = require('firebase-admin');

function getUserPromise(userId) {
  return new Promise((resolve, reject) => {
    if (!userId || typeof userId !== 'string') {
      reject('Invalid or missing userId');
    }

    admin.database().ref(`/users/${userId}`).once('value')
      .then(snapshot => snapshot.val())
      .then(user => {
        if (!user) {
          reject({message: 'User not found'});
        }

        return resolve(user);
      })
  })
}

module.exports = getUserPromise;
