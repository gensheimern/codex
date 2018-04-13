var express = require('express');
var router = express.Router();
var Group = require('../models/MessageModel');

router.get('/:id?', function(req, res, next) {

  if (req.params.id) {
    Group.getMessageById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Group.getAllMessages(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }

    });
  }
});

router.get('/activity/:id', function(req, res, next) {

  Group.getMessageByActivity(req.params.id, function(err, rows) {
    console.log("jupuupup");
    if (err) {
      res.json(err);
    } else {
      res.json(rows); //or return count for 1 & 0
    }
  });
});

router.post('/', function(req, res, next) {

  Group.addMessage(req.body, function(err, count) {

    console.log(req.body);

    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});


router.delete('/:id', function(req, res, next) {

  Group.deleteMessageById(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.delete('/activity/:id', function(req, res, next) {

  Group.deleteMessageByActivity(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.put('/:id', function(req, res, next) {

  Group.updateMessage(req.params.id, req.body, function(err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;