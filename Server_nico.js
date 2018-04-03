const express = require('express');
const app = express();
const DatabaseConnection = require('./DatabaseConnection')
const dbconnection = new DatabaseConnection();

/*
======== REST API =======
*/



app.get('/User', function(req, res) {



})



function encryptPassword(string) {
  var hash = 0;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;

}


app.get('/', function(req, res) {
  res.send('Hello World');
})

var server = app.listen(3000, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})