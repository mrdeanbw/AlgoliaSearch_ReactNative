'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);
var index = client.initIndex('users');

const initUsersIndex = functions.database.ref('/users').onWrite(event => {
    // Only new objects
    if (event.data.previous.exists()) {
        return;
    }
    console.log('initIndex function');
    var objectsToIndex = [];
    var values = event.data.val();
    for (var key in values){
        if (values.hasOwnProperty(key)){
            //Get current firease object
            var firebaeObject = values[key];
            //Specify algolia`s objectID using the firebase object key
            firebaeObject.objectID = key;
            //Add object for indexing
            objectsToIndex.push(firebaeObject);
        }
    }
    index.saveObjects(objectsToIndex, function(err, content){
        if (err){
            throw err;
        }
        console.log('Users<>Algolia import done');
    });
});

module.exports = initUsersIndex;