'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const stripe = require('./stripe');

/* Stripe */
module.exports.stripeCleanupUser = stripe.cleanupUser;
module.exports.stripeCreateAccount = stripe.createAccount;
module.exports.stripeCreateCustomer = stripe.createCustomer;
module.exports.stripeGetAccount = stripe.getAccount;

module.exports.stripeCreateCard = stripe.createCard;
module.exports.stripeDeleteCard = stripe.deleteCard;
module.exports.stripeGetCards = stripe.getCards;
