const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');

/*const team = require('./routes/TeamRouter');
const user = require('./routes/UserRouter');
const message = require('./routes/MessageRouter');
const activity = require('./routes/ActivityRouter');
const subscribed = require('./routes/subscribedRouter');
const subscriber = require('./router/subscriberRouter');
const participates = require('./routes/participatesRouter');
const member_of = require('./routes/memberRouter');*/
const mail = require('./mailservice/mailservice');

const jwt = require('jsonwebtoken');
const authenticate = require('./routes/auth/AuthenticateRouter');
const verifyToken = require('./routes/auth/verify');

// Middlewares
app.use(serveStatic(path.join(__dirname + "/frontend/build")));
app.use(bodyParser.json());


app.use('/authenticate', authenticate);

app.use('/mail', verifyToken, mail);



const apiPath = "/";
const apiRouter = require('./routes/MainRouter');
app.use(apiPath, verifyToken, apiRouter);
/*app.use('/team', verifyToken, team);
app.use('/user', verifyToken, user);
app.use('/message', verifyToken, message);
app.use('/activity', verifyToken, activity);
app.use('/subscribed', verifyToken, subscribed);
app.use('/participates', verifyToken, participates);
app.use('/member', verifyToken, member_of);*/





module.exports = app;
