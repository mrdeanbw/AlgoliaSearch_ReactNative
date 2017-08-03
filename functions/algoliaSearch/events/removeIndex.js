'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);

var index = client.initIndex('events');
const removeEventIndex = functions.database.ref('events/{eventId}').onDelete(event => {
    // console.log("event.params.userId", event.params.userId);
    //Remove the object from Algolia
    index.deleteObject(event.params.userId, function(err, content){
        if (err){
            throw err;
        }
        console.log('Firebase<>Algolia object deleted');
    })
})

module.exports = removeEventIndex;