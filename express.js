
const { reqprom, request } = require('./shared/rpc2');
const { constructEvent } = require('./shared/mq');
const { eventTypes } = require('./shared/resources');

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/bikes/', function(req, res) {
    const newEvent = constructEvent(eventTypes.testEvents.testEvent, "client", {});
    request(eventTypes.testEvents.getData1, newEvent, function(data) {
      res.json(data);
      })
    
      
    
    /*amqpClient.sendRPCMessage(channel, number, 'rpc_queue')
      .then(msg => {
        const result = JSON.parse(msg.toString());
        res.json(result);
      });
    */
});

app.get('/test/', function(req, res) {
  const newEvent = constructEvent(eventTypes.testEvents.testEvent, "client", {});
  reqprom(eventTypes.testEvents.testEvent, newEvent)
  
  //.then(res.send('Hello World!'));

  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})