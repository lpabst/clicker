var app = require('./index.js');

module.exports = {
  example: function(req, res){
    var db = app.get('db');
    console.log('example');
  },
  
  startTimer: (req, res) => {
    startTime = new Date();
    req.session.startTime = startTime;
    return res.status(200).send('timer started');
  },
  
  time1000: (req, res) => {
    var db = app.get('db');
    let time1000 = new Date().getTime() - req.session.startTime;
    return res.status(200).send(time1000);
  }
  
};
