const express = require('express');
const app = express();
const DatabaseConnection = require('../DatabaseConnection')
const dbconnection = new DatabaseConnection();

/*
======== REST API =======
*/





}


app.get('/', function(req, res) {
  res.send('Hello World');
})

var server = app.listen(3000, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})