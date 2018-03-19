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
    let endTime = new Date().getTime();
    let timeThousand = endTime - req.session.startTime;
    handleRecordTime('thousandLeaders', 'newThousandRecord', timeThousand, req, res);
  },
  
  timeMillion: (req, res) => {
    var db = app.get('db');
    let timeMillion = new Date().getTime() - req.session.startTime;
    db.millionLeaders([numRowsPerLeaderboard])
    .then( mLeaders => {
      let isRecord = false;
      for (let i = 0; i < mLeaders.length; i++){
        if (timeMillion/1000 < mLeaders[i].score){
          // console.log('new record');
          isRecord = true;
          let user = req.session.username || 'anonymous';
          // console.log(user);
          // console.log(timeMillion);
          i = mLeaders.length + 1;
          db.newMillionRecord([timeMillion/1000, user])
          .then( done => {
            return res.status(200).send({time: timeMillion, isRecord: true});
          })
          .catch(err=>{});
        }
      }
      if (!isRecord){
        return res.status(200).send({time: timeMillion, isRecord: false});
      }
    })
    .catch(err=>{})
  },
  
  timeBillion: (req, res) => {
    var db = app.get('db');
    let timeBillion = new Date().getTime() - req.session.startTime;
    db.billionLeaders([numRowsPerLeaderboard])
    .then( bLeaders => {
      let isRecord = false;
      for (let i = 0; i < bLeaders.length; i++){
        if (timeBillion/1000 < bLeaders[i].score){
          isRecord = true;
          let user = req.session.username || 'anonymous';
          i = bLeaders.length + 1;
          db.newBillionRecord([timeBillion/1000, user])
          .then( done => {
            return res.status(200).send({time: timeBillion, isRecord: true});
          })
          .catch(err=>{});
        }
      }
      if (!isRecord){
        return res.status(200).send({time: timeBillion, isRecord: false});
      }
    })
    .catch(err=>{})
  },
  
  timeGameOver: (req, res) => {
    var db = app.get('db');
    let timeGameOver = new Date().getTime() - req.session.startTime;
    db.gameOverLeaders([numRowsPerLeaderboard])
    .then( goLeaders => {
      let isRecord = false;
      for (let i = 0; i < goLeaders.length; i++){
        if (timeGameOver/1000 < goLeaders[i].score){
          isRecord = true;
          let user = req.session.username || 'anonymous';
          i = goLeaders.length + 1;
          db.newGameOverRecord([timeGameOver/1000, user])
          .then( done => {
            return res.status(200).send({time: timeGameOver, isRecord: true});
          })
          .catch(err=>{});
        }
      }
      if (!isRecord){
        return res.status(200).send({time: timeGameOver, isRecord: false});
      }
    })
    .catch(err=>{})
  },
  
};
