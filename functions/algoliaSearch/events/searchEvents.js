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
    index.setSettings({
        attributesForFaceting: [
            'activity',
            'date',
            'gender',
            'level',
            'courtType',
            'geospatial'
        ]
    });
    
    var queryString;
    if (searchkeyObj.activity){
        var searchActivity = searchkeyObj.activity;
        var queryString = `activity:${searchActivity}`
    }
    
   
    if (searchkeyObj.gender){
        var searchGender = searchkeyObj.gender;
        queryString += ` AND gender:${searchGender}`
    }
    
    if (searchkeyObj.level){
        var searchLevel = searchkeyObj.level;
        queryString += ` AND level:${searchLevel}`
    }

    if (searchkeyObj.courtType){
        var searchCourtType = searchkeyObj.courtType;
        queryString += ` AND courtType:${searchCourtType}`
    }
    
    if (searchkeyObj.date){
        var searchDate = searchkeyObj.date;
    }

    index.search({
        filters:`${queryString}`
    }).then(content => {
        res.status(200).send(content.hits);     
    })

    if (searchkeyObj.geospatial && searchkeyObj.geospatial.radius){
        index.search({
            aroundLatLng: 'searchkeyObj.geospatial.coords.lat, searchkeyObj.geospatial.coords.lng',
            aroundRadius : searchkeyObj.geospatial.radius * 1609

        }).then(content => {
            //res.status(200).send(content.hits);     
        })
    }
})

module.exports = searchEvents;