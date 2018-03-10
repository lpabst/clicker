const express = require('express');
const bodyParser = require('body-parser');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.js');

const app = module.exports = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie:{
      maxAge: (1000*60*60*24*14) //this is 14 days
    }
}))

massive(config.connection)
.then( db => {
  app.set('db', db);
})

app.use(express.static(__dirname + './../build'))

var userController = require("./userController.js");

//////////Endpoints for the front end
app.post('/api/startTimer', userController.startTimer); 
app.post('/api/timeThousand', userController.timeThousand);
app.post('/api/timeMillion', userController.timeMillion);
app.post('/api/timeBillion', userController.timeBillion);
app.post('/api/timeGameOver', userController.timeGameOver);


app.listen(config.port, console.log("you are now connected on " + config.port));
