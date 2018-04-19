const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');

const team = require('./routes/TeamRouter');
const user = require('./routes/UserRouter');
const message = require('./routes/MessageRouter');
const activity = require('./routes/ActivityRouter');
const subscribed = require('./routes/subscribedRouter');
const participates = require('./routes/participatesRouter');
const member_of = require('./routes/member_ofRouter');

const jwt = require('jsonwebtoken');
const authenticate = require('./routes/auth/AuthenticateRouter');
let verifyToken = require('./routes/auth/verify');



app.use(bodyParser.json());

app.use('/team', verifyToken, team);
app.use('/user', verifyToken, user);
app.use('/message', verifyToken, message);
app.use('/activity', verifyToken, activity);
app.use('/subscribed', verifyToken, subscribed);
app.use('/participates', verifyToken, participates);
app.use('/memberof', verifyToken, member_of);

app.use('/authenticate', authenticate);


// Middlewares
app.use(serveStatic(path.join(__dirname + "/frontend/build")));


module.exports = app;
