var app = require('./index.js');

module.exports = {
  getLeaderboard: function(req, res){
    var db = app.get('db');

    db.thousandLeaders()
    .then( tLeaders => {
      console.log(tLeaders);
    })
    .catch(e);
    
  },
  
  startTimer: (req, res) => {
    startTime = new Date().getTime();
    req.session.startTime = startTime;
    return res.status(200).send('timer started');
  },
  
  timeThousand: (req, res) => {
    var db = app.get('db');
    let endTime = new Date().getTime();
    let timeThousand = endTime - req.session.startTime;
    return res.status(200).send({time: timeThousand});
  },
  
  timeMillion: (req, res) => {
    var db = app.get('db');
    let timeMillion = new Date().getTime() - req.session.startTime;
    return res.status(200).send({time: timeMillion});
  },
  
  timeBillion: (req, res) => {
    var db = app.get('db');
    let timeBillion = new Date().getTime() - req.session.startTime;
    return res.status(200).send({time: timeBillion});
  },
  
  timeGameOver: (req, res) => {
    var db = app.get('db');
    let timeGameOver = new Date().getTime() - req.session.startTime;
    return res.status(200).send({time: timeGameOver});
  },
  
};
