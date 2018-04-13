var express = require('express');
var router = express.Router();
var participates = require('../models/participatesModel');

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

  participates.addParticipates(req.body, function(err, count) {

    console.log(req.body);

    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});


router.delete('/:id', function(req, res, next) {

  participates.deleteParticipatesAll(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.delete('/userid/activityid', function(req, res, next) {

  participates.deleteParticipatesSingle(req.body.User_Id, req.body.Activity_Id, function(err, count) {
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