'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

var algoliasearch = require('algoliasearch');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);

const reindexUserIndex = functions.database.ref('users').onUpdate(event => {
    // Only new objects
    // if (event.data.previous.exists()) {
    //     return;
    // }
    // // Create a temp index
    // var tempIndexName = 'users_temp';
    // var tempIndex = client.initIndex(tempIndexName);
    // var objectsToIndex = [];
    // var values = event.data.val();
    // for (var key in values){
    //     if (values.hasOwnProperty(key)){
    //         var firebaeObject = values[key];
    //         firebaeObject.objectID = key;
    //         objectsToIndex.push(firebaeObject);
    //     }
    // }
    // index.saveObjects(objectsToIndex, function(err, content){
    //     if (err){
    //         throw err;
    //     }
    //     //Overwrite main index with temp index
    //     client.moveIndex(tempIndexName, 'users',function(err, content){
    //         if (err){
    //             throw err;
    //         }
    //         console.log('Users --> Algolia reimport done');
    //     });
    // });
});

module.exports = reindexUserIndex;