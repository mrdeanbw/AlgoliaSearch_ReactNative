'use strict';

const functions = require('firebase-functions');

// const recurEvent = require('../recurring');
const addToDate = require('../utils/addToDate');

const everyHour = functions.pubsub.topic('hourly-tick').onPublish((event) => {
  // recurEvent();
});

const everyDay = functions.pubsub.topic('daily-tick').onPublish((event) => {
  console.log('This job is ran every day!');
});

// every saturday 00:00
const everyWeek = functions.pubsub.topic('weekly-tick').onPublish((event) => {
  console.log('This job is ran every week!');
});

module.exports.everyHour = everyHour;
module.exports.everyDay = everyDay;
module.exports.everyWeek = everyWeek;
