var express = require('express');
var router = express.Router();
var {axiosCall, getTextMessageInput} = require('../message');
require('dotEnv').config;

router.get('/', (req, res, next) => {

  res.render('index', { title: 'Express' });

  var data = getTextMessageInput(process.env.RECIPIENT_WAID, 'hello_world');

  axiosCall(data)
    .then(res => {console.log(res)}) // narrow it down a bit?
      .catch(err => {console.log(err.response.data)})
});

router.post('/', (req, res) => {
    // ACCEPTING MESSAGES THEN SENDING BACK SOME CONTENT FROM AN API...
});


module.exports = router;
