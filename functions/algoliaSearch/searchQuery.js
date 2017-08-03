'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');

const algolia_app_ID = functions.config().algolia.app_id;
const algolia_api_key = functions.config().algolia.api_key;
var client = algoliasearch(algolia_app_ID, algolia_api_key);

var index = client.initIndex('users');

const searchQuery = functions.https.onRequest((req, res) => {
    console.log("req", req);
    console.log("req.query", req.query);

    
    console.log("searchquery1", req.query.searchkey);
    console.log("searchquery2", req.query[searchkey]);
    
    var json = JSON.parse(req.query);
    console.log("json1", json.searchkey);
    console.log("json2", json[searchkey]);

    let reaData = req.query.searchKey;
    index.search(req.query.searchKey, function(err, content){
        console.log(content.hits);
        res.status(200).send(content.hits);
    })
})

module.exports = searchQuery;