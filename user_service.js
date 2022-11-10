#!/usr/bin/env node

const { consumeMessagesByType, constructEvent, publishEventByType } = require('./shared/mq');
const { exchanges, eventTypes } = require('./shared/resources');

const serviceName = "userService";

/**
 * Consuming events
 */

consumeMessagesByType(exchanges.system, eventTypes.accountEvents.createAccount, function(e) {
  createAccount(e);
});

consumeMessagesByType(exchanges.system, eventTypes.accountEvents.login, function(e) {
  userLogin(e);
});

consumeMessagesByType(exchanges.system, eventTypes.accountEvents.logout, function(e) {
  userLogout(e);
});

consumeMessagesByType(exchanges.system, eventTypes.accountEvents.updateUserInfo, function(e) {
  updateUserInfo(e);
});

consumeMessagesByType(exchanges.system, eventTypes.accountEvents.addMoney, function(e) {
  addMoney(e);
});

consumeMessagesByType(exchanges.system, eventTypes.paymentEvents.invoiceCreated, function(e) {
  payInvoice(e);
});


/**
 * Handling events and publishing new
 */

function createAccount(event) {
  console.log("Creating account");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.accountEvents.accountCreated, serviceName, data);
  publishEventByType(exchanges.system, eventTypes.accountEvents.accountCreated, newEvent);
}

function userLogin(event) {
  console.log("User logged in");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.accountEvents.userLoggedin, serviceName, data);
  publishEventByType(exchanges.system, eventTypes.accountEvents.userLoggedin, newEvent);
}

function userLogout(event) {
  console.log("User logged out");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.accountEvents.userLoggedout, serviceName, data);
  publishEventByType(exchanges.system, eventTypes.accountEvents.userLoggedout, newEvent);
}

function updateUserInfo(event) {
  console.log("Updating user info");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.accountEvents.userInfoUpdated, serviceName, data);
  publishEventByType(exchanges.system, eventTypes.accountEvents.userInfoUpdated, newEvent);
}

function addMoney(event) {
  console.log("Adding money to account");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.accountEvents.balanceUpdated, serviceName, data);
  publishEventByType(exchanges.system, eventTypes.accountEvents.balanceUpdated, newEvent);
}

function payInvoice(event) {
  console.log("Paying invoice");
  console.log(JSON.stringify(event));
  const data = getData();
  const newEvent = constructEvent(eventTypes.paymentEvents.invoicePaid, serviceName, data);
  publishEventByType(exchanges.system, eventTypes.paymentEvents.invoicePaid, newEvent);
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



