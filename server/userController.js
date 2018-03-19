var app = require('./index.js');
const numRowsToShowPerLeaderboard = 10;
const maxRowsToKeepInDBPerLeaderboard = 100;

const cleanLeaderboards = () => {
  let calls = ['cleanThousand', 'cleanTenTh', 'cleanHundredTh', 'cleanMillion', 'cleanBillion', 'cleanGameOver'];
  for (let i = 0; i < calls.length; i++){
    db[calls[i]](maxRowsToKeepInDBPerLeaderboard)
    .then(res=>{}).catch(err=>{});
  }
}

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
  db[call1]([numRowsToShowPerLeaderboard])
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
    
    db.thousandLeaders([numRowsToShowPerLeaderboard])
    .then( thousandLeaders => {
      db.tenThLeaders([numRowsToShowPerLeaderboard])
      .then( tenThLeaders => {
        db.hundredThLeaders([numRowsToShowPerLeaderboard])
        .then( hundredThLeaders => {
          db.millionLeaders([numRowsToShowPerLeaderboard])
          .then( mLeaders => {
            db.billionLeaders([numRowsToShowPerLeaderboard])
            .then( bLeaders => {
              db.gameOverLeaders([numRowsToShowPerLeaderboard])
              .then( goLeaders => {
                let username = req.session.username || 'Not Logged In';
                return res.status(200).send({
                  username: username,
                  leaders: {
                    thousand: thousandLeaders,
                    tenThousand: tenThLeaders,
                    hundredThousand: hundredThLeaders,
                    million: mLeaders,
                    billion: bLeaders,
                    gameOver: goLeaders,
                  }
                })
              }).catch(err => {});
            }).catch(err => {});
          }).catch(err => {});
        }).catch(err => {});
      }).catch(err => {});
    }).catch(err => {});

  },
  
  startTimer: (req, res) => {
    startTime = new Date().getTime();
    req.session.startTime = startTime;
    cleanLeaderboards();
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
