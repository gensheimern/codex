const express = require('express');
const router = express.Router();
const DatabaseConnection = require('./DatabaseConnection')
const dbconnection = new DatabaseConnection();

router.post('/', (req, res) => {
  dbconnection.injectStatement("INSERT INTO `User` (`ID`, `Vorname`, `Nachname`, `Email`, `Password`)" +
    " VALUES (NULL, 'Herbert', 'Kohl', 'h.kohl@gmx.de', '" + encryptPassword(Mystring) + "');");
  res.send("done");
});

module.exports = router;