var app = require('./index.js');
const numRowsPerLeaderboard = 10;

const checkIfTimeIsANewRecord = (userTime, leaders) => {
  let isRecord = false;
  for (let i = 0; i < leaders.length; i++){
    if (userTime/1000 < leaders[i].score){
      return true;
    }
  }
  return false;
}

const handleRecordTime = (call1, call2, userTime, req, res) => {
  let user = req.session.username || 'anonymous';
  var db = app.get('db');
  db[call1]([numRowsPerLeaderboard])
  .then( leaders => {
    let isRecord = checkIfTimeIsANewRecord(userTime, leaders);
    if (isRecord){
      db[call2]([userTime/1000, user])
      .then( done => {
        return res.status(200).send({time: userTime, isRecord: true});
      })
      .catch(err=>{});
    }else{
      return res.status(200).send({time: userTime, isRecord: false});
    }
  })
}

module.exports = {
  getLeaderboard: function(req, res){
    const db = app.get('db');
    
    db.thousandLeaders([numRowsPerLeaderboard])
    .then( tLeaders => {
      db.millionLeaders([numRowsPerLeaderboard])
      .then( mLeaders => {
        db.billionLeaders([numRowsPerLeaderboard])
        .then( bLeaders => {
          db.gameOverLeaders([numRowsPerLeaderboard])
          .then( goLeaders => {
            let username = req.session.username || 'Not Logged In';
            return res.status(200).send({
              username: username,
              leaders: {
                thousand: tLeaders,
                million: mLeaders,
                billion: bLeaders,
                gameOver: goLeaders,
              }
            })
          }).catch(err => {});
        }).catch(err => {});
      }).catch(err => {});
    }).catch(err => {});

  },
  
  startTimer: (req, res) => {
    startTime = new Date().getTime();
    req.session.startTime = startTime;
    return res.status(200).send('timer started');
  },
  
  timeThousand: (req, res) => {
    var db = app.get('db');
    let timeThousand = new Date().getTime() - req.session.startTime;
    handleRecordTime('thousandLeaders', 'newThousandRecord', timeThousand, req, res);
  },

  timeTenThousand: (req, res) => {
    var db = app.get('db');
    let timeTenThousand = new Date().getTime() - req.session.startTime;
    handleRecordTime('tenThLeaders', 'newTenThRecord', timeTenThousand, req, res);
  },

  timeHundredThousand: (req, res) => {
    var db = app.get('db');
    let timeHundredThousand = new Date().getTime() - req.session.startTime;
    handleRecordTime('hundredThLeaders', 'newHundredThRecord', timeHundredThousand, req, res);
  },
  
  timeMillion: (req, res) => {
    var db = app.get('db');
    let timeMillion = new Date().getTime() - req.session.startTime;
    handleRecordTime('millionLeaders', 'newMillionRecord', timeMillion, req, res);
  },
  
  timeBillion: (req, res) => {
    var db = app.get('db');
    let timeBillion = new Date().getTime() - req.session.startTime;
    handleRecordTime('billionLeaders', 'newBillionRecord', timeBillion, req, res);
  },
  
  timeGameOver: (req, res) => {
    var db = app.get('db');
    let timeGameOver = new Date().getTime() - req.session.startTime;
    handleRecordTime('gameOverLeaders', 'newGameOverRecord', timeGameOver, req, res);
  },
  
};
