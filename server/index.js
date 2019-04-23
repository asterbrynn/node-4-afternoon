const express = require('express');
const session = require('express-session');
require('dotenv').config();
const swagCtrl = require('./controllers/swagCtrl');
const authCtrl = require('./controllers/authCtrl');

const checkForSession = require('./middlewares/checkForSession');
let {SERVER_PORT, SESSION_SECRET} = process.env;

const app = express();
app.use(express.json());
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}))
app.use(checkForSession);

app.get('/api/swag', swagCtrl.read);

app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));