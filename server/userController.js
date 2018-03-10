var app = require('./index.js');

module.exports = {
  example: function(req, res){
    var db = app.get('db');
    console.log('example');
  },
  
};
