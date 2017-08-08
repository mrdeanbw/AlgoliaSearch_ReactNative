'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);

var index = client.initIndex('users');

const searchQueryUser = functions.https.onRequest((req, res) => {
    index.search(req.query.searchkey, function(err, content){
        res.status(200).send(content.hits);
    })
})

module.exports = searchQueryUser;