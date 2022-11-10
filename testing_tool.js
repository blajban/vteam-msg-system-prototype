#!/usr/bin/env node

const { exchanges, eventTypes } = require('./shared/resources');
const { publishEventByType, constructEvent } = require('./shared/mq');


const x = process.argv[2] || exchanges.tests;
const t = process.argv[3] || eventTypes.testEvents.testEvent;

const serviceName = "testingTool";

const data = { test: "test" };

if (x == "-h" || x == "--help") {
    console.log("Usage: [exchange] [eventType]")
    console.log("Available exchanges:");
    console.log(exchanges);
    console.log("Available events:");
    console.log(eventTypes);
} else if ((t in eventTypes.accountEvents || t in eventTypes.rentScooterEvents ||
    t in eventTypes.driveScooterEvents || t in eventTypes.returnScooterEvents ||
    t in eventTypes.paymentEvents || t in eventTypes) && x in exchanges) {
        const newEvent = constructEvent(t, serviceName, data);
        publishEventByType(x, t, newEvent);
        console.log(`Sent '${t}' to '${x}' exchange`);
} else {
    console.log("Unrecognised options. Usage: [exchange] [eventType]. -h or --help for help.");
}

setTimeout(function() {
    process.exit(0);
}, 500);
