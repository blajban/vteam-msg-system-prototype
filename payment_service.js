#!/usr/bin/env node

const { consumeMessagesByType, constructEvent, publishEventByType } = require('./shared/mq');
const { exchanges, eventTypes } = require('./shared/resources');

const serviceName = "paymentService";

/**
 * Consuming events
 */

consumeMessagesByType(exchanges.system, eventTypes.rentScooterEvents.rentScooter, function(e) {
  startInvoice(e);
});

consumeMessagesByType(exchanges.system, eventTypes.rentScooterEvents.rideStarted, function(e) {
  updateInvoiceScoterInfo(e);
});

consumeMessagesByType(exchanges.system, eventTypes.returnScooterEvents.rideFinished, function(e) {
  updateInvoiceRideInfo(e);
});

consumeMessagesByType(exchanges.system, eventTypes.paymentEvents.parkingRateEstablished, function(e) {
  createInvoice(e);
});

consumeMessagesByType(exchanges.system, eventTypes.paymentEvents.invoicePaid, function(e) {
  invoicePaid(e);
});







/**
 * Handling events and publishing new
 */
function startInvoice(event) {
  console.log("Starting invoice");
  console.log(JSON.stringify(event));
}

function updateInvoiceScoterInfo(event) {
  console.log("Updating invoice with scooter info");
  console.log(JSON.stringify(event));
}

function updateInvoiceRideInfo(event) {
  console.log("Updating invoice with ride info");
  console.log(JSON.stringify(event));
}

function createInvoice(event) {
  console.log("Finalizing invoice");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.paymentEvents.invoiceCreated, serviceName, data);
  publishEventByType(exchanges.system, eventTypes.paymentEvents.invoiceCreated, newEvent);
}

function invoicePaid(event) {
  console.log("Invoice Paid!");
  console.log(JSON.stringify(event));
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



