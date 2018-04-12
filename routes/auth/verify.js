var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'secret', function(err, decoded) {
      if (err) { //failed verification.
        return res.status(403).json({
          "success": false
        });
      }
      req.decoded = decoded;
      next(); //no error, proceed
    });
  } else {
    // forbidden without token
    return res.status(403).send({
      "success": false
    });
  }
}