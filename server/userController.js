var app = require('./index.js');

module.exports = {
  getLeaderboard: function(req, res){
    var db = app.get('db');
    
    console.log('getting leaders');
    db.thousandLeaders()
    .then( tLeaders => {
      db.millionLeaders()
      .then( mLeaders => {
        db.billionLeaders()
        .then( bLeaders => {
          db.gameOverLeaders()
          .then( goLeaders => {
            return res.status(200).send({
              leaders: {
                thousand: tLeaders,
                million: mLeaders,
                billion: bLeaders,
                gameOver: goLeaders,
              }
            })
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));

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
