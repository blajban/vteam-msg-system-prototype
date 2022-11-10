#!/usr/bin/env node

const { consumeMessagesByType, constructEvent, publishEventByType } = require('./shared/mq');
const { exchanges, eventTypes } = require('./shared/resources');

const serviceName = "scooterService";

/**
 * Consuming events
 */

consumeMessagesByType(exchanges.system, eventTypes.rentScooterEvents.rentScooter, function(e) {
  unlockScooter(e);
});

consumeMessagesByType(exchanges.scooters, eventTypes.rentScooterEvents.scooterUnlocked, function(e) {
  startRide(e);
});

consumeMessagesByType(exchanges.scooters, eventTypes.driveScooterEvents.scooterMoving, function(e) {
  updatePosition(e);
});

consumeMessagesByType(exchanges.scooters, eventTypes.driveScooterEvents.batteryLow, function(e) {
  markForCharging(e);
});

consumeMessagesByType(exchanges.system, eventTypes.returnScooterEvents.parkScooter, function(e) {
  parkScooter(e);
});

consumeMessagesByType(exchanges.scooters, eventTypes.returnScooterEvents.scooterLocked, function(e) {
  rideFinished(e);
});




/**
 * Handling events and publishing new
 */
function unlockScooter(event) {
  console.log("Unlocking scooter");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.rentScooterEvents.unlockScooter, serviceName, data);
  publishEventByType(exchanges.scooters, eventTypes.rentScooterEvents.unlockScooter, newEvent);
}

function startRide(event) {
  console.log("Happy ride!");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.rentScooterEvents.rideStarted, serviceName, data);
  publishEventByType(exchanges.system, eventTypes.rentScooterEvents.rideStarted, newEvent);
}

function updatePosition(event) {
  console.log("A scooter updated its position");
  console.log(JSON.stringify(event));
}

function markForCharging(event) {
  console.log("A scooter has low battery!");
  console.log(JSON.stringify(event));
}

function parkScooter(event) {
  console.log("Locking scooter");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.returnScooterEvents.lockScooter, serviceName, data);
  publishEventByType(exchanges.scooters, eventTypes.returnScooterEvents.lockScooter, newEvent);
}

function rideFinished(event) {
  console.log("Hope you had a nice ride!");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.returnScooterEvents.rideFinished, serviceName, data);
  publishEventByType(exchanges.system, eventTypes.returnScooterEvents.rideFinished, newEvent);
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



