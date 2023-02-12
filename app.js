const path = require('path');

const express = require('express');
// const csrf = require('csurf');

const db = require('./data/database');
const authRoutes = require('./routes/auth-routes');
const productRoutes = require('./routes/product-routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// app.use(csrf());

app.use(authRoutes);
app.use(productRoutes);

db.connectToDatabase().then(function () {
    app.listen(3000);
})