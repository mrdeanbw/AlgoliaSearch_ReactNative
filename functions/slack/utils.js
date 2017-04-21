'use strict';

const functions = require('firebase-functions');
const rp = require('request-promise');

function postToSlack(text) {
  const uri = functions.config().slack.webhook_url;
  const channel = functions.config().slack.channel;
  const username = functions.config().slack.username;

  return rp({
    method: 'POST',
    uri,
    body: {
      channel,
      text,
      username,
      icon_emoji: 'ghost',
    },
    json: true,
  });
}

module.exports = {
  postToSlack,
}
