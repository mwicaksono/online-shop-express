const path = require('path');

const express = require('express');

const db = require('./data/database');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);
app.use(productRoutes);

db.connectToDatabase().then(function () {
    app.listen(3000);
})