var jwt = require('jsonwebtoken');

/*
Works as Middleware and verifys each task. Token is delivered by the header,
gets verified and the next task will be executed if the token is valid
*/

module.exports = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'secret', function(err, decoded) {
      if (err) { //failed verification.
        return res.status(403).json({
          "success": false,
          "message": "failed verification"
        });
      }
      req.decoded = decoded;
      next(); //no error, proceed
    });
  } else {
    // forbidden without token
    return res.status(403).send({
      "success": false,
      "message": "forbidden without token"
    });
  }
}