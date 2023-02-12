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

module.exports = {
    getSignup,
    getLogin,
    signup
}