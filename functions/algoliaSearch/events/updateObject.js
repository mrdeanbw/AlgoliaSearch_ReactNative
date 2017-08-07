'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);

var index = client.initIndex('events');
var updatEventeObject = functions.database.ref('events/{eventId}').onUpdate(event => {
    var index = client.initIndex('events');
    var firebaseObject = event.data.val();
    firebaseObject.objectID = event.params.eventId
    index.saveObject(firebaseObject, function(err, content){
        if (err){
            throw err;
        }
        console.log('Firebase<>Algolia object updated!');
    })
})

module.exports = updatEventeObject;