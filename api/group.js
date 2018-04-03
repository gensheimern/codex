const express = require('express');
const router = express.Router();
const DatabaseConnection = require('./DatabaseConnection')
const dbconnection = new DatabaseConnection();

router.post('/', (req, res) => {
  dbconnection.injectStatement("INSERT INTO `Gruppen` (`ID`, `Name`, `Useranzahl`) VALUES (NULL, 'tobi', '8');");
  res.send("done");
});

module.exports = router;