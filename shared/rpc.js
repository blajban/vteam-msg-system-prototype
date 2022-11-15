#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

const host = 'amqp://localhost';

const rpcQueue = 'reply_queue';

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}

const request = (eventType, event, cb) => {
  amqp.connect(host, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      const correlationId = generateUuid();
      

      channel.consume(q.queue, function(msg) {
        if (msg.properties.correlationId == correlationId) {
          cb(JSON.parse(msg.content));
          setTimeout(function() {
            connection.close();
            process.exit(0)
          }, 500);
        }
      }, {
        noAck: true
      });

      channel.sendToQueue(eventType,
        Buffer.from(JSON.stringify(event)),{
          correlationId: correlationId,
          replyTo: q.queue });
    });
  });
});
}


const response = (eventType, cb) => {
  amqp.connect(host, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(eventType, {
      durable: false
    });

    channel.prefetch(1);

    channel.consume(eventType, function reply(msg) {
      const data = cb(JSON.parse(msg.content));
      channel.sendToQueue(msg.properties.replyTo,
        Buffer.from(JSON.stringify(data)), {
          correlationId: msg.properties.correlationId
        });

      channel.ack(msg);
    });
  });
})
}


module.exports = { request, response }

