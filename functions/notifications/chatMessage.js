'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const chatMessage = functions.database.ref('/chat/{chatId}/{messageId}').onWrite(event => {
  const chatId = event.params.chatId;
  const messageId = event.params.messageId;
  const data = event.data.val()
})

module.exports = chatMessage;
