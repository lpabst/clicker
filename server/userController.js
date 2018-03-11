var app = require('./index.js');

module.exports = {
  getLeaderboard: function(req, res){
    const db = app.get('db');
    
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
    db.thousandLeaders()
    .then( tLeaders => {
      for (let i = 0; i < tLeaders.length; i++){
        if (timeThousand < tLeaders[i].score){
          let user = req.session.username || 'anonymous';
          i = tLeaders.length + 1;
          db.newThousandRecord([timeThousand, user])
          .then( done => {
            return res.status(200).send({time: timeThousand, isRecord: true});
          })
          .catch(err=>console.log(err));
        }else{
          return res.status(200).send({time: timeThousand, isRecord: false});
        }
      }
    })
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
