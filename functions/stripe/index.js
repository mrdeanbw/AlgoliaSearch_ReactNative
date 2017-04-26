module.exports = {};

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const currency = functions.config().stripe.currency || 'GBP';
const country = 'GB'

module.exports.cleanupUser = require('./cleanupUser');

/* Stripe Account Functions */
module.exports.createAccount = require('./createAccount');
module.exports.createCustomer = require('./createCustomer');

module.exports.getAccount = require('./getAccount');
module.exports.getAccountBalance = require('./getAccountBalance');

/* Stripe Card Functions */
module.exports.chargeCard = require('./chargeCard');
module.exports.createCard = require('./createCard');
module.exports.deleteCard = require('./deleteCard');
module.exports.getCards = require('./getCards');
