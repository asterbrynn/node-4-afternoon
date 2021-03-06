const express = require('express');
const session = require('express-session');
require('dotenv').config();
const swagCtrl = require('./controllers/swagCtrl');
const authCtrl = require('./controllers/authCtrl');
const cartCtrl = require('./controllers/cartCtrl');
const searchCtrl = require('./controllers/searchCtrl');

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
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swagCtrl.read);

app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser);

app.post('/api/cart/checkout', cartCtrl.checkout);
app.post('/api/cart/:id', cartCtrl.add);
app.delete('/api/cart/:id', cartCtrl.delete);

app.get('/api/search', searchCtrl.search);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));