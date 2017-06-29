'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const cron = require('./cron');
const notifications = require('./notifications');
const slack = require('./slack');
const stripe = require('./stripe');

/* Stripe */
module.exports.stripeCleanupUser = stripe.cleanupUser;
module.exports.stripeCreateAccount = stripe.createAccount;
module.exports.stripeCreateCustomer = stripe.createCustomer;
module.exports.stripeGetAccount = stripe.getAccount;
module.exports.stripeGetAccountBalance = stripe.getAccountBalance;

module.exports.stripeChargeCard = stripe.chargeCard;
module.exports.stripeCreateCard = stripe.createCard;
module.exports.stripeDeleteCard = stripe.deleteCard;
module.exports.stripeGetCards = stripe.getCards;

/* Slack Hooks */
// module.exports.slackCreateUser = slack.createUser;

/* Notifications */
module.exports.notificationsChatMessage = notifications.chatMessage;
module.exports.notificationsFriendsRequest = notifications.friendsRequest;
module.exports.notificationsPushNotification = notifications.pushNotification;

/* Cron */
module.exports.cronEveryHour = cron.everyHour;
module.exports.cronEveryDay = cron.everyDay;
module.exports.cronEveryWeek = cron.everyWeek;
