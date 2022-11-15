#!/usr/bin/env node

const { response } = require('../shared/rpc');
const { exchanges, eventTypes } = require('../shared/resources');

const serviceName = "server";


response(eventTypes.testEvents.getData1, function(e) {
  return getData1(e);
});
response(eventTypes.testEvents.getData2, function(e) {
  return getData2(e);
});



/**
 * Representing db
 */

function getData1(e) {
  return {
    userId: "test 1",
    userName: "test 1"
  }; 
}

function getData2(e) {
  return {
    userId: "test 2",
    userName: "test 2"
  }; 
}




