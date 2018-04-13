var express = require('express');
var router = express.Router();
var Member = require('../models/member_ofModel');

router.get('/:id?', function(req, res, next) {

  if (req.params.id) {
    Member.getMemberById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Member.getAllMember(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }

    });
  }
});

router.post('/', function(req, res, next) {

  Member.addMember(req.body, function(err, count) {

    console.log(req.body);

    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});


router.delete('/:id', function(req, res, next) {

  Member.deleteMemberAll(req.params.id, function(err, count) {

    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.delete('/:userid/:teamid', function(req, res, next) {

  Member.deleteMemberSingle(req.params.userid, req.params.teamid, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});


/*
============================================================================
================== Fraglich ob überhaupt benötigt ==========================
============================================================================

router.put('/:id', function(req, res, next) {

  Member.updateMember(req.params.id, req.body, function(err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
*/
module.exports = router;