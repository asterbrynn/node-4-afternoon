const express = require('express');
const session = require('express-session');
require('dotenv').config();

const checkForSession = require('./middlewares/checkForSession');
const swagCtrl = require('./controllers/swagCtrl');
let {SERVER_PORT, SESSION_SECRET} = process.env;

const app = express();
app.use(express.json());
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}))
app.use(checkForSession);

app.get('/api/swag', swagCtrl.read)

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));