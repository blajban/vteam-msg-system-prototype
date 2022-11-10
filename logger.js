#!/usr/bin/env node

const { consumeMessagesAll } = require('./shared/mq');
const { exchanges, eventTypes } = require('./shared/resources');

console.log("Waiting for messages...");

for (const x in exchanges) {
  consumeMessagesAll(x, function(e) {
    printLog(e);
    console.log("Waiting for messages...");
});
}

let counter = 0;
function printLog(event) {
  console.log(`${counter}: ${event.eventType}-event from ${event.origin}: ${JSON.stringify(event.data)}`)
  counter++;
}

