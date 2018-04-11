var express = require('express');
var router = express.Router();
var Subscriber = require('../models/subscribedModel');

router.get('/:id?', function(req, res, next) {

  if (req.params.id) {
    Subscriber.getSubscriberById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Subscriber.getAllSubscriber(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }

    });
  }
});

router.post('/', function(req, res, next) {

  Subscriber.addSubscriber(req.body, function(err, count) {

    console.log(req.body);

    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});


router.delete('/subscriberid', function(req, res, next) {

  Subscriber.deleteSubscriberAll(req.body.Subscriber_Id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.delete('/subscribedid', function(req, res, next) {

  Subscriber.deleteSubscribedAll(req.body.Subscribed_Id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.delete('/subscriberid/subscribedid', function(req, res, next) {

  Subscriber.deleteSubscribeSingle(req.body.Subscriber_Id, req.body.Subscribed_Id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.put('/:id', function(req, res, next) {

  Subscriber.updateSubscriber(req.params.id, req.body, function(err, rows) {

    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;