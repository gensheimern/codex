var express = require('express');
var router = express.Router();
var User = require('../../models/UserModel');
const jwt = require('jsonwebtoken');

/*
API to signup users and also to authenticate them. In the authenticate API
we will create a token for a successful login and send it to the client.
*/
router.post('/', function(req, res, next) {

  User.getUserByEmail(req.body.Email, function(err, rows) {

    if (err) {

      res.sendStatus(404);

    } else {
      // If the user doesnt exits, it will send status code 403 and the
      // json to the client
      if (!rows[0]) {
        res.status(403);
        res.json({
          "success": false,
          "Email": "not found"
        })
      } else {
        //If the password doesnt match, it sends status code 403
        if (rows[0].Password != req.body.Password) {

          res.sendStatus(403);

        } else {
          //If the password match, send the token back to the client,
          //including expiration Date which is 24 hours
          var token = jwt.sign({
              "User_Id": rows[0].User_Id,
              "Firstname": rows[0].Firstname,
              "Name": rows[0].Name,
              "Email": rows[0].Email,
              iat: Math.floor(Date.now() / 1000) - 30,
              exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)

            },
            'secret');
          console.log(token);
          res.json({
            success: true,
            token: token
          });
        }
      }
    }
  });
});




module.exports = router;