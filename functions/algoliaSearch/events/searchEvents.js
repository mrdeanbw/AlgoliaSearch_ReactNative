'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);

var index = client.initIndex('events');
// searchquery1 {
    // "activity":"ATHLETICS
    // "date":null,
    // "gender":null,
    // "level":"casual",
    // "courtType":"indoor",
    // "geospatial":{
    //     "coords":null,
    //     "radius":null}
    // }
const searchEvents = functions.https.onRequest((req, res) => {
    var searchkeyObj = JSON.parse(req.query.searchkey);
    console.log("searchquery2", searchkeyObj);

    if (searchkeyObj.activity){
        console.log("search activity1", searchkeyObj.activity);
        var searchActivity = searchkeyObj.activity;
        index.search({
            query : 'TENNIS'
            //filters : ['activity']
        })
        .then(content => {
            console.log("content.hits in searchEvent", content.hits);
            res.status(200).send(content.hits);
        })
    }
})

module.exports = searchEvents;