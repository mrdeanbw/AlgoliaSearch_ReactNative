'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const addToDate = require('../utils/addToDate');

const recurEvent = () => {
  return admin.database().ref('events/').once('value', snapshot => {
    const events = snapshot.val();

    Object.keys(events).map((key, index) => {
      let event =  events[key];

      // Ignore all events that do not have recurring as true
      if (!event.recurring) {
        return;
      }

      const newEvent = Object.assign({}, event);
      const newEventRef = admin.database().ref('events/').push();

      // Get the new projected date/time
      const newEventData = Object.assign({}, newEvent, {
        id: newEventRef.key,
        date: addToDate(event.date, event.recurringType, event.recurringValue),
      });

      admin.database().ref('/').update({
        [`events/${newEventRef.key}`]: newEventData,
        [`events/${event.id}/recurring`]: false,
        [`users/${event.organizer}/organizing/${newEventRef.key}`]: true,
      }).then(() => {
          // Find all the REQUESTS for people that attended the previous event
          const requestPromises = event.requests.map((key) => {
            return firebase.database().ref('/requests/').child(key).once('value');
          });

          Promise.all(requestPromises).then((snapshots) => {
            snapshots.forEach((snapshot) => {
              const snapshot = snapshot.val();
              createInvite(event.organizer, newEventRef.key);
            });
          });

          console.info(`Event ${event.id} cloned to ${newEventRef.key}`);
      });
    });
  });
}

module.exports = recurEvent;

