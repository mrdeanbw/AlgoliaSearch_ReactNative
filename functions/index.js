'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const stripe = require('./stripe');
module.exports.stripeCleanupUser = stripe.cleanupUser;
module.exports.stripeCreateAccount = stripe.createAccount;
module.exports.stripeCreateCustomer = stripe.createCustomer;
module.exports.stripeGetAccount = stripe.getAccount;
