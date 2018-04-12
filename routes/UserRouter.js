var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');

router.get('/:id?', function(req, res, next) {

  if (req.params.id) {
    User.getUserById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    User.getAllUser(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }

    });
  }
});

router.post('/', function(req, res, next) {

  User.addUser(req.body, function(err, count) {

    console.log(req.body);

    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});


router.delete('/:id', function(req, res, next) {

  User.deleteUser(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.put('/:id', function(req, res, next) {

  User.updateUser(req.params.id, req.body, function(err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;