'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.token);

const currency = functions.config().stripe.currency || 'GBP';
const country = 'GB';

// Register an Account and write the id reference into Firebase
const createAccount = functions.https.onRequest((req, res, next) => {
  const userId = req.body.userId;

  if (!userId) {
    res.send(400, 'No UserId provided');
  }

  let data = {
    email: req.body.email,
    external_account: {
      object: 'bank_account',
      account_number: req.body.accountNumber,
      routing_number: req.body.sortCode,
      country: country,
      currency: currency,
      account_holder_name: req.body.name,
      account_holder_type: 'individual',
    },
    legal_entity: {
      type: 'individual',
      address: {
        city: req.body.city,
        line1: req.body.addressLine1,
        line2: req.body.addressLine2,
        postal_code: req.body.postcode,
      },
      first_name: req.body.firstName,
      last_name: req.body.lastName,
    },
    transfer_schedule: {
      interval: 'daily',
    },
    tos_acceptance: {
      date: Math.round(Date.now() / 1000),
      ip: req.connection.remoteAddress,
    },
    metadata: {
      userId: req.body.userId,
    },
  };

  if ('dob' in req.body) {
    const dob = new Date(parseInt(req.body.dob));

    data.legal_entity.dob = {
      day: dob.getDate(),
      month: dob.getMonth() + 1,
      year: dob.getFullYear(),
    };
  }

  admin.database().ref(`/users/${userId}`).once('value')
    .then(snapshot => snapshot.val())
    .then(user => {
      const stripeAccount = user.stripeAccount

      if (stripeAccount) {
        // Update existing account
        stripe.accounts.update(stripeAccount, data)
          .then(result => res.send(result))
          .catch(err => res.send(500, err));
      } else {
        // Create a new account account
        data = Object.assign({}, data, {
          // Required
          managed: true,
          country: country,
        })

        stripe.accounts.create(data).then(account => {
          admin.database().ref(`/users/${userId}/stripeAccount`).set(account.id).then(() => {
            res.send(account);
          })
        }).catch(err => res.send(500, err));
      }
    })
});

module.exports = createAccount
