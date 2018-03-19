var app = require('./index.js');
const numRowsToShowPerLeaderboard = 10;
const maxRowsToKeepInDBPerLeaderboard = 100;

// goes through each of the leaderboards and deletes anything over the top 100 records
const cleanLeaderboards = () => {
  var db = app.get('db');
  let calls = ['cleanThousand', 'cleanTenTh', 'cleanHundredTh', 'cleanMillion', 'cleanBillion', 'cleanGameOver'];
  for (let i = 0; i < calls.length; i++) {
    db[calls[i]](maxRowsToKeepInDBPerLeaderboard)
      .then(res => { }).catch(err => { });
  }
}

// Captures analytics for the app. gets the current analytics, updates whichever one you pass in, then updates all of the values in the database
const captureAnalytics = (whichMetric) => {
  if (whichMetric){
    var db = app.get('db');
    db.getAnalytics()
      .then(analytics => {
        let newAnalytics = analytics[0];
        newAnalytics[whichMetric] ++;
        let {loginpagehits, homepagehits, gamestarts, thousandcompletes, tenthcompletes, hundredthcompletes, millioncompletes, billioncompletes, gameovercompletes} = newAnalytics;
        db.updateAnalytics([loginpagehits, homepagehits, gamestarts, thousandcompletes, tenthcompletes, hundredthcompletes, millioncompletes, billioncompletes, gameovercompletes])
          .then( res => {
            // console.log(res);
          })
          .catch(err => {});
      })
      .catch(err => { });
  }
}

// Checks the user's time against the top times to see if the user has beaten any of the previous records
const checkIfTimeIsANewRecord = (userTime, leaders) => {
  let isRecord = false;
  for (let i = 0; i < leaders.length; i++) {
    if (userTime / 1000 < leaders[i].score) {
      return true;
    }
  }
  return false;
}

// gets the top times for whichever leaderboard we pass it, checks if the user has beaten any of those times (using the function above), then if so enters the user's time into the db. Either way it alerts the user of their official time and whether or not it was a new record
const handleRecordTime = (call1, call2, userTime, req, res) => {
  let user = req.session.username || 'anonymous';
  var db = app.get('db');
  db[call1]([numRowsToShowPerLeaderboard])
    .then(leaders => {
      let isRecord = checkIfTimeIsANewRecord(userTime, leaders);
      if (isRecord) {
        db[call2]([userTime / 1000, user])
          .then(done => {
            return res.status(200).send({ time: userTime, isRecord: true });
          })
          .catch(err => { });
      } else {
        return res.status(200).send({ time: userTime, isRecord: false });
      }
    })
}

module.exports = {
  // Gets all of the leaderboards and sends that info to the front end. 
  getLeaderboard: function (req, res) {
    const db = app.get('db');

    db.thousandLeaders([numRowsToShowPerLeaderboard])
      .then(thousandLeaders => {
        db.tenThLeaders([numRowsToShowPerLeaderboard])
          .then(tenThLeaders => {
            db.hundredThLeaders([numRowsToShowPerLeaderboard])
              .then(hundredThLeaders => {
                db.millionLeaders([numRowsToShowPerLeaderboard])
                  .then(mLeaders => {
                    db.billionLeaders([numRowsToShowPerLeaderboard])
                      .then(bLeaders => {
                        db.gameOverLeaders([numRowsToShowPerLeaderboard])
                          .then(goLeaders => {
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
                          }).catch(err => { });
                      }).catch(err => { });
                  }).catch(err => { });
              }).catch(err => { });
          }).catch(err => { });
      }).catch(err => { });

  },

  // captures analytics for various metrics by calling the function listed above
  captureAnalyticsInfo: (req, res) => {
    return captureAnalytics(req.body.metric);
  },

  // Creates a new date and sets the start time on req.session. Then it calls the function that cleans the leaderboard DB tables to keep them relatively small. Then it calls the capture analytics function
  startTimer: (req, res) => {
    startTime = new Date().getTime();
    req.session.startTime = startTime;
    res.status(200).send('timer started');
    cleanLeaderboards();
    return captureAnalytics('gamestarts');
  },

  // the rest of these use the functions above to handle whether or not the users's time is a new record
  timeThousand: (req, res) => {
    var db = app.get('db');
    let timeThousand = new Date().getTime() - req.session.startTime;
    handleRecordTime('thousandLeaders', 'newThousandRecord', timeThousand, req, res);
    return captureAnalytics('thousandcompletes');
  },
  
  timeTenThousand: (req, res) => {
    var db = app.get('db');
    let timeTenThousand = new Date().getTime() - req.session.startTime;
    handleRecordTime('tenThLeaders', 'newTenThRecord', timeTenThousand, req, res);
    return captureAnalytics('tenthcompletes');
  },
  
  timeHundredThousand: (req, res) => {
    var db = app.get('db');
    let timeHundredThousand = new Date().getTime() - req.session.startTime;
    handleRecordTime('hundredThLeaders', 'newHundredThRecord', timeHundredThousand, req, res);
    return captureAnalytics('hundredthcompletes');
  },
  
  timeMillion: (req, res) => {
    var db = app.get('db');
    let timeMillion = new Date().getTime() - req.session.startTime;
    handleRecordTime('millionLeaders', 'newMillionRecord', timeMillion, req, res);
    return captureAnalytics('millioncompletes');
  },
  
  timeBillion: (req, res) => {
    var db = app.get('db');
    let timeBillion = new Date().getTime() - req.session.startTime;
    handleRecordTime('billionLeaders', 'newBillionRecord', timeBillion, req, res);
    return captureAnalytics('billioncompletes');
  },
  
  timeGameOver: (req, res) => {
    var db = app.get('db');
    let timeGameOver = new Date().getTime() - req.session.startTime;
    handleRecordTime('gameOverLeaders', 'newGameOverRecord', timeGameOver, req, res);
    return captureAnalytics('gameovercompletes');
  },

};
