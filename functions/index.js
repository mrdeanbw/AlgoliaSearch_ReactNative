'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const cron = require('./cron');
const notifications = require('./notifications');
const recurring = require('./recurring');
const slack = require('./slack');
const stripe = require('./stripe');
const algoliaSearch = require('./algoliaSearch');

/* Stripe */
module.exports.stripeCleanupUser = stripe.cleanupUser;
module.exports.stripeCreateAccount = stripe.createAccount;
module.exports.stripeCreateCustomer = stripe.createCustomer;
module.exports.stripeGetAccount = stripe.getAccount;
module.exports.stripeGetAccountBalance = stripe.getAccountBalance;
module.exports.stripeGetAccountTransactions = stripe.getAccountTransactions;
module.exports.stripeListPayouts = stripe.listPayouts;
module.exports.stripeRetrievePayouts = stripe.retrievePayouts;

module.exports.stripeChargeCard = stripe.chargeCard;
module.exports.stripeCreateCard = stripe.createCard;
module.exports.stripeDeleteCard = stripe.deleteCard;
module.exports.stripeGetCards = stripe.getCards;

/* Slack Hooks */
// module.exports.slackCreateUser = slack.createUser;

/* Notifications */
module.exports.notificationsChatMessage = notifications.chatMessage;
module.exports.notificationsEventInvite = notifications.eventInvite;
module.exports.notificationsFriendsRequest = notifications.friendsRequest;
module.exports.notificationsEventRequest = notifications.eventRequest;
module.exports.notificationsPushNotification = notifications.pushNotification;

/* Cron */
module.exports.cronEveryHour = cron.everyHour;
module.exports.cronEveryDay = cron.everyDay;
module.exports.cronEveryWeek = cron.everyWeek;

/* Recurring */
module.exports.recurEvent = recurring.recurEventHttp;

/* Algolia Search */
// Events
module.exports.initEventsIndex = algoliaSearch.initEventsIndex;
module.exports.createEventIndex = algoliaSearch.createEventIndex;
module.exports.reindexEventIndex = algoliaSearch.reindexEventIndex;
module.exports.removeEventIndex = algoliaSearch.removeEventIndex;
module.exports.updatEventeObject = algoliaSearch.updatEventeObject;
module.exports.searchQueryEvent = algoliaSearch.searchQueryEvent;
module.exports.searchEvents = algoliaSearch.searchEvents;
module.exports.geoSearch = algoliaSearch.geoSearch;
// Users
module.exports.initUsersIndex = algoliaSearch.initUsersIndex;
module.exports.createUserIndex = algoliaSearch.createUserIndex;
module.exports.reindexUserIndex = algoliaSearch.reindexUserIndex;
module.exports.removeUserIndex = algoliaSearch.removeUserIndex;
module.exports.updateUserObject = algoliaSearch.updateUserObject;
module.exports.searchQueryUser = algoliaSearch.searchQueryUser;
