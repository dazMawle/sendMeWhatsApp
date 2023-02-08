const express = require('express');
const bodyParser = require('body-parser');

const {axiosCall, getTextMessageInput} = require('./message')

const app = express();

app.use(bodyParser.json());

const token = process.env.TOKEN || 'token';

app.get('/', (req, res) => {
  res.status(200);
  res.send('Root path!');
});

app.get('/webhook', (req, res) => {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == token
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post('/webhook', (req, res) => {

  let body = req.body;

  console.log(JSON.stringify(body,null,2));

  if(body.object){
    if(body.entry && 
        body.entry[0].changes && 
        body.entry[0].changes[0].value.messages && 
        body.entry[0].changes[0].value.messages[0]
      ){
        let phoneNumID = body.entry[0].changes[0].value.metadata.phone_number_id;
        let from = body.entry[0].changes[0].value.messages[0].from; 
        let messageBody = body.entry[0].changes[0].value.messages[0].text.body;

        console.log(phoneNumID, from, messageBody);

        res.sendStatus(200);
      }else{
        res.sendStatus(404);
      }

    }

});

module.exports = app;

