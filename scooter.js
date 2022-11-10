#!/usr/bin/env node

const { consumeMessagesByType, constructEvent, publishEventByType } = require('./shared/mq');
const { exchanges, eventTypes } = require('./shared/resources');

const serviceName = "scooterService";

/**
 * Consuming events
 */

consumeMessagesByType(exchanges.scooters, eventTypes.rentScooterEvents.unlockScooter, function(e) {
  unlock(e);
});

consumeMessagesByType(exchanges.scooters, eventTypes.rentScooterEvents.setSpeedLimitZones, function(e) {
  speedLimit(e);
});

consumeMessagesByType(exchanges.scooters, eventTypes.returnScooterEvents.lockScooter, function(e) {
  lock(e);
});






/**
 * Handling events and publishing new
 */
function unlock(event) {
  console.log("Im unlocked");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.rentScooterEvents.scooterUnlocked, serviceName, data);
  publishEventByType(exchanges.scooters, eventTypes.rentScooterEvents.scooterUnlocked, newEvent);
}

function speedLimit(event) {
  console.log("Entered a speed limit zone");
  console.log(JSON.stringify(event));
}

function lock(event) {
  console.log("Im locked");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.returnScooterEvents.scooterLocked, serviceName, data);
  publishEventByType(exchanges.scooters, eventTypes.returnScooterEvents.scooterLocked, newEvent);
}



/**
 * Representing db
 */

function getData(user) {
  return {
    userId: "test",
    userName: "test"
  }; 
}



