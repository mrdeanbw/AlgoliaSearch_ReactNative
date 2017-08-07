'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

var algoliasearch = require('algoliasearch');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);

var index = client.initIndex('users');

var createIndex = functions.database.ref('users/{userId}').onCreate(event => {
    var index = client.initIndex('users');
    var firebaseObject = event.data.val();
    // console.log("firebaseObject", firebaseObject);
    // console.log('Uppercasing', event.params.userId, event.eventType,event.eventId );
    // console.log('event.params.userId', event.params.userId);
    // console.log("event.data", event.data);
    // console.log("event.resource", event.resource);

    firebaseObject.objectID = event.params.userId

    index.addObject(firebaseObject, function(err, content){
        if (err){
            throw err;
        }
        console.log('Firebase<>Algolia object created!');
    })
})

module.exports = createIndex;