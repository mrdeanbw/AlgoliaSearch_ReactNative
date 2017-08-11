'use strict';

module.exports = {};
// Events
module.exports.initEventsIndex = require('./events/initIndex');
module.exports.createEventIndex = require('./events/createIndex');
module.exports.reindexEventIndex = require('./events/reindexIndex');
module.exports.removeEventIndex = require('./events/removeIndex');
module.exports.updatEventeObject = require('./events/updateObject');
module.exports.searchQueryEvent = require('./events/searchQuery');
module.exports.searchEvents = require('./events/searchEvents');
module.exports.geoSearch = require('./events/geoSearch');

// Users
module.exports.initUsersIndex = require('./users/initIndex');
module.exports.createUserIndex = require('./users/createIndex');
module.exports.reindexUserIndex = require('./users/reindexIndex');
module.exports.removeUserIndex = require('./users/removeIndex');
module.exports.updateUserObject = require('./users/updateObject');
module.exports.searchQueryUser = require('./users/searchQuery');


