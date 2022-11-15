#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const { eventTypes } = require('./resources');

const host = 'amqp://localhost';

const publishEventAll = (exchange, event) => {
  amqp.connect(host, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertExchange(exchange, 'direct', {
      durable: false
    });

    Object.values(eventTypes).forEach((group) => {
      Object.values(group).forEach((type) => {
        channel.publish(exchange, type, Buffer.from(JSON.stringify(event)));
      });
    });


    setTimeout(function() {
      connection.close();
    }, 100);
  });
});
}

const publishEventByType = (exchange, eventType, event) => {
  amqp.connect(host, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertExchange(exchange, 'direct', {
      durable: false
    });
    channel.publish(exchange, eventType, Buffer.from(JSON.stringify(event)));
    setTimeout(function() {
      connection.close();
    }, 500);
  });
});
}



const consumeMessagesAll = (exchange, cb) => {
  amqp.connect(host, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertExchange(exchange, 'direct', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }

      Object.values(eventTypes).forEach((group) => {
        Object.values(group).forEach((type) => {
          channel.bindQueue(q.queue, exchange, type);
        });
      });

      channel.consume(q.queue, function(msg) {
        cb(JSON.parse(msg.content));
      }, { noAck: true });
    });
  });
})
}

const consumeMessagesByType = (exchange, eventType, cb) => {
  amqp.connect(host, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertExchange(exchange, 'direct', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      //console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, eventType);

      channel.consume(q.queue, function(msg) {
        cb(JSON.parse(msg.content));
      }, { noAck: true });
    });
  });
})
}

const constructEvent = (eventType, origin, json_data) => {
  return {
    eventType: eventType,
    origin: origin,
    data: json_data
  }
}

module.exports = { publishEventAll, publishEventByType, consumeMessagesAll, consumeMessagesByType, constructEvent }

