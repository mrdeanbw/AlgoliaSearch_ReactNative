'use strict'

const moment = require('moment');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);

var index = client.initIndex('events');

const searchQueryEvent = functions.https.onRequest((req, res) => {
    index.setSettings({
        attributesForFaceting: [
            'activity',
            'address',
            'title',
            'cancelled',
            'privacy'
        ],
        searchableAttributes: [
            'activity',
            'address',
            'title'
        ]
    });
    index.search({
        query : req.query.searchkey, 
        restrictSearchableAttributes : [
            'activity',
            'address',
            'title'
        ],
        filters : 'privacy:public AND NOT cancelled:true'
    }).then(content => {
        var matches = JSON.parse(JSON.stringify(content.hits));
        var filtered = [];
        for (var i =0; i < matches.length; i++){
            if (moment(matches[i].date).isBefore() == false){
                filtered.push(matches[i]);
            }
        }        
        res.status(200).send(filtered);
    })
})

module.exports = searchQueryEvent;
