module.exports = {};

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const currency = functions.config().stripe.currency || 'GBP';
const country = 'GB'

module.exports.cleanupUser = require('./cleanupUser');
module.exports.createAccount = require('./createAccount');
module.exports.createCustomer = require('./createCustomer');
module.exports.getAccount = require('./getAccount');
