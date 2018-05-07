var express = require('express');
var router = express.Router();
var participates = require('../models/participatesModel');
var jwt = require('jsonwebtoken');

router.get('/:id?', function(req, res, next) {

  if (req.params.id) {
    participates.getParticipatesById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    participates.getAllParticipates(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }

    });
  }
});

router.post('/', function(req, res, next) {

  var token = req.headers['x-access-token'];
  var decoded = jwt.decode(token, 'secret');

  participates.addParticipates(req.body,decoded.User_Id, function(err, count) {

    console.log(token);

    if (err) {
      if (err.code === 'ER_DUP_ENTRY'){
      res.status(400).json({
        message: "Duplicate Entry"
      });
      }
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});


router.delete('/:id?', function(req, res, next) {

  var token = req.headers['x-access-token'];
  var decoded = jwt.decode(token, 'secret');
  console.log(decoded.User_Id + " " +req.params.id);
  participates.deleteParticipatesSingle(decoded.User_Id, req.params.id, function(err, count) {

    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});


/*
==================================================================================
================== Fraglich ob überhaupt benötigt ================================
==================================================================================


router.put('/:id', function(req, res, next) {

  participates.updateParticipates(req.params.id, req.body, function(err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
*/
module.exports = router;
