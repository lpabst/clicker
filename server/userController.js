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
  
  timeThousand: (req, res) => {
    var db = app.get('db');
    let timeThousand = new Date().getTime() - req.session.startTime;
    return res.status(200).send(timeThousand);
  },
  
  timeMillion: (req, res) => {
    var db = app.get('db');
    let timeMillion = new Date().getTime() - req.session.startTime;
    return res.status(200).send(timeMillion);
  },
  
  timeBillion: (req, res) => {
    var db = app.get('db');
    let timeBillion = new Date().getTime() - req.session.startTime;
    return res.status(200).send(timeBillion);
  },
  
  timeGameOver: (req, res) => {
    var db = app.get('db');
    let timeGameOver = new Date().getTime() - req.session.startTime;
    return res.status(200).send(timeGameOver);
  },
  
};
