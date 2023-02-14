const User = require('../models/user');

const getSignup = (req, res) => {
    res.render('customer/auth/signup');
}

const getLogin = (req, res) => {
    res.render('customer/auth/login');
}

const signup = async (req, res) => {
    const insertData = req.body;

    const user = new User(
        null,
        insertData['full-name'],
        insertData.email,
        insertData.password,
        insertData.street,
        insertData.postalCode,
        insertData.city,
        false);

    const result = await user.save();
    console.log(result);
    res.redirect('/login');
}

const login = async (req, res) => {
    const loginData = req.body;
    const user = new User(null,
        null,
        loginData.email,
        null,
        null,
        null,
        null,
        false)
    const existingUser = await user.getUserWithSameEmail();
    console.log(existingUser);
    res.redirect('/');
}

module.exports = {
    getSignup,
    getLogin,
    signup,
    login
}