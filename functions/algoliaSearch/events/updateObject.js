'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);

var index = client.initIndex('events');

var updateObject = functions.database.ref('events/{eventId}').onUpdate(event => {
    // console.log('updateObject function');
    var index = client.initIndex('events');
    var firebaseObject = event.data.val();
    // console.log("firebaseObject", firebaseObject);
    // console.log('Uppercasing', event.params.eventId, event.eventType,event.eventId );
    // console.log('event.params.eventId', event.params.eventId);
    // console.log("event.data", event.data);
    // console.log("event.resource", event.resource);
    firebaseObject.objectID = event.params.eventId
    index.saveObject(firebaseObject, function(err, content){
        if (err){
            throw err;
        }
        console.log('Firebase<>Algolia object updated!');
    })
})

module.exports = updateObject;