'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');
const moment = require('moment');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);
var index = client.initIndex('events');

const geoSearch = functions.https.onRequest((req, res) => {
    var searchkeyObj = JSON.parse(req.query.searchkey);
    var queryString = 'privacy:public AND NOT cancelled:true'
    
    index.setSettings({
        attributesForFaceting: [
            'addressCoords',
            'cancelled',
            'privacy'
        ],
    });

    if (searchkeyObj.lat && searchkeyObj.lon){
        index.search({
            filters:`${queryString}`,    
            aroundLatLng: `${searchkeyObj.lat}, ${searchkeyObj.lon}`,
        })
        .then(content => {
            var result = [];
            for (let i = 0; i < content.hits.length; i++){
                if (moment(content.hits[i].date).isAfter()) result.push(content.hits[i]);
            }
            // console.log("result", result);
            res.status(200).send(result); 
        })
        .catch(err => console.log(err))
    }
    else {
        var result = [];
        res.status(200).send(result); 
    }
})

module.exports = geoSearch;