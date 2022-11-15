#!/usr/bin/env node

const { request } = require('../shared/rpc');
const { constructEvent } = require('../shared/mq');
const { exchanges, eventTypes } = require('../shared/resources');

console.log("Sending requests!");

const newEvent = constructEvent(eventTypes.testEvents.testEvent, "client", {});

request(eventTypes.testEvents.getData1, newEvent, function(res) {
  console.log(res);
})

request(eventTypes.testEvents.getData2, newEvent, function(res) {
  console.log(res);
})

