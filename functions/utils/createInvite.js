'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const createInvite = (fromUserId, toUserId, eventId) => {
  const inviteRef = admin.database().ref('events/').push();
  const inviteKey = inviteRef.key;

  const inviteData =  {
    userId: toUserId,
    fromId: fromUserId,
    eventId,
    status: 'pending',
    date: new Date(),
  };

  admin.database().ref('/').update({
    [`invites/${inviteKey}`]: inviteData,
    [`events/${eventId}/invites/${inviteKey}`]: true,
    [`users/${userId}/invites/${inviteKey}`]: true,
  }, (err) => {
    console.log(err);
  })
}

module.exports = createInvite;
