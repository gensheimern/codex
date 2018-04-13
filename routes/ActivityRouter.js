var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Activity = require('../models/ActivityModel');

router.get('/:id?', function(req, res, next) {

  if (req.params.id) {
    Activity.getActivityById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Activity.getAllActivitys(function(err, rows) {
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

  Activity.addActivity(req.body, decoded.User_Id, function(err, count) {

    console.log(req.body);

    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});


router.delete('/:id', function(req, res, next) {

  Activity.deleteActivity(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.put('/:id', function(req, res, next) {

  Activity.updateActivity(req.params.id, req.body, function(err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;