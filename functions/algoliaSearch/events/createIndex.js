'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);

var index = client.initIndex('events');
var createEventIndex = functions.database.ref('events/{eventId}').onCreate(event => {
    // Only new objects
    if (event.data.previous.exists()) {
        return;
    }
    var index = client.initIndex('events');
    var firebaseObject = event.data.val();    
    firebaseObject.objectID = event.params.eventId
    if (firebaseObject.addressCoords){
        firebaseObject._geoloc = {
            lat : firebaseObject.addressCoords.lat,
            lng : firebaseObject.addressCoords.lon
        }
    }
    
    index.addObject(firebaseObject, function(err, content){
        if (err){
            throw err;
        }
        console.log('Event --> Algolia object created!');
    })
})

module.exports = createEventIndex;