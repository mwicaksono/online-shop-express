const path = require('path');

const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

const db = require('./data/database');
const createSessionConfig = require('./config/session');
const addCsrfToken = require('./middlewares/csrf-token');
const handleErrors = require('./middlewares/error-handler');
const authRoutes = require('./routes/auth-routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfToken);

app.use(authRoutes);

app.use(handleErrors);


db.connectToDatabase().then(function () {
    app.listen(3000);
}).catch(function (error) {
    console.log('failed to connect to the database');
    console.log(error);
})