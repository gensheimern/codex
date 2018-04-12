var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

//  https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

router.post('/', function(req, res, next) {


  User.getUserByEmail(req.body.Email, function(err, rows) {

    if (err) {
      res.sendStatus(404);
    } else {
      if (rows[0].Password != req.body.Password) {
        res.sendStatus(403);

      } else {

        var token = jwt.sign({
            "Firstname": rows[0].Firstname,
            "Name": rows[0].Name,
            "Email": rows[0].Email,
            iat: Math.floor(Date.now() / 1000) - 30,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)

          },
          'secret');
        console.log(token);
        res.json({
          token: token
        });

      }


    }


  });


});
module.exports = router;