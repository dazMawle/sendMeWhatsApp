const axios = require('axios');
require('dotenv').config;

const getTextMessageInput = (recipient, template) => {
    return JSON.stringify({
      "messaging_product": "whatsapp", 
      "to": recipient,
      "type": "template",
      "template": { 
        "name": template,
        "language": {
          "code": "en_US" 
        } 
      }
    }); 
}

const axiosCall = (data) => {
    var config = {
        method: 'post',
        url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
        headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
        },
        data: data
    };

  return(axios(config));
}

module.exports = {axiosCall, getTextMessageInput}
