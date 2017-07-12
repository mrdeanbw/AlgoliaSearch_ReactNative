'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const addToDate = require('../utils/addToDate');

const recurEvent = () => {
  return admin.database().ref('events/').once('value', snapshot => {
    const events = snapshot.val();

    Object.keys(events).map((key, index) => {
      let event =  events[key];

      const newEvent = Object.assign({}, event);
      const newEventRef = admin.database().ref('events/').push();

      // Get the new projected date/time
      const newEventData = newEvent.update({
        id: newEventRef.key,
        date: addToDate(event.recurringType, event.recurringValue),
      });

      newEventRef.set(newEventData).then(() => {
        console.log("event cloned!!")
        resolve();
      });
    });
  });
}

module.exports = recurEvent;
