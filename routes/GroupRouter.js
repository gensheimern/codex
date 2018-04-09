var express = require('express');
var router = express.Router();
var Group = require('../models/GroupModel');

router.get('/:id?', function(req, res, next) {

  if (req.params.id) {
    Group.getGroupById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Group.getAllGroups(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }

    });
  }
});

router.post('/', function(req, res, next) {

  Group.addGroup(req.body, function(err, count) {

    console.log(req.body);

    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});


router.delete('/id', function(req, res, next) {

  Group.deleteGroup(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.put('/:id', function(req, res, next) {

  Group.updateGroup(req.params.id, req.body, function(err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;