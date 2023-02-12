const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getSignup = (req, res) => {
    res.render('customer/auth/signup');
}

const getLogin = (req, res) => {
    res.render('customer/auth/login');
}

const insertUser = async (req, res) => {
    const insertData = req.body;
    const name = insertData.name;
    const email = insertData.email;
    const password = await bcrypt.hash(insertData.password, 12);
    const address = insertData.address;
    const isAdmin = false;

    const user = new User(null, name, email, password, address, isAdmin)
    const result = await user.save();
    console.log(result);
    res.redirect('/signup');
}

module.exports = {
    getSignup,
    getLogin,
    insertUser
}