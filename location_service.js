#!/usr/bin/env node

const { consumeMessagesByType, constructEvent, publishEventByType } = require('./shared/mq');
const { exchanges, eventTypes } = require('./shared/resources');

const serviceName = "paymentService";

/**
 * Consuming events
 */

consumeMessagesByType(exchanges.system, eventTypes.rentScooterEvents.rideStarted, function(e) {
  setSpeedLimitZones(e);
});

consumeMessagesByType(exchanges.system, eventTypes.returnScooterEvents.rideFinished, function(e) {
  establishParkingRate(e);
});


/**
 * Handling events and publishing new
 */
function setSpeedLimitZones(event) {
  console.log("Setting speed limit zones");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.rentScooterEvents.setSpeedLimitZones, serviceName, data);
  publishEventByType(exchanges.scooters, eventTypes.rentScooterEvents.setSpeedLimitZones, newEvent);
}

function establishParkingRate(event) {
  console.log("Setting parking rates");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.paymentEvents.parkingRateEstablished, serviceName, data);
  publishEventByType(exchanges.system, eventTypes.paymentEvents.parkingRateEstablished, newEvent);
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



