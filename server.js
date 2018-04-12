const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const http = require('http').Server(app);
const path = require('path');

const team = require('./routes/TeamRouter');
const user = require('./routes/UserRouter');
const message = require('./routes/MessageRouter');
const activity = require('./routes/ActivityRouter');
const subscribed = require('./routes/subscribedRouter');
const participates = require('./routes/participatesRouter');
const member_of = require('./routes/member_ofRouter');

const jwt = require('jsonwebtoken');
const authenticate = require('./routes/AuthenticateRouter');


app.use(bodyParser.json());

app.use('/team', team);
app.use('/user', user);
app.use('/message', message);
app.use('/activity', activity);
app.use('/subscribed', subscribed);
app.use('/participates', participates);
app.use('/memberof', member_of);

app.use('/authenticate', authenticate);


// Middlewares
app.use(serveStatic(path.join(__dirname + "/frontend/build")));

// Start Server
http.listen(5000, function() {
  console.log('Server started: http://localhost:5000');
});