var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Team = require('../models/TeamModel');

router.get('/:id?', function(req, res, next) {

  if (req.params.id) {
    Team.getTeamById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Team.getAllTeam(function(err, rows) {
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

  Team.addTeam(req.body, decoded.User_Id, function(err, count) {

    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});


router.delete('/id', function(req, res, next) {

  Team.deleteTeam(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.put('/:id', function(req, res, next) {

  Team.updateTeam(req.params.id, req.body, function(err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;