const User = require('../models/user');
const authUtil = require('../utils/authentication');
const validation = require('../utils/validation');
const flashMessage = require('../utils/flash-message');

const getSignup = (req, res) => {
    let sessionData = flashMessage.getSessionData(req);
    if (!sessionData) {
        sessionData = {
            message: '',
            email: '',
            confirmEmail: '',
            fullName: '',
            street: '',
            postal: '',
            city: ''
        };
    }
    res.render('customer/auth/signup', { sessionData });
}

const getLogin = (req, res) => {

    let sessionData = flashMessage.getSessionData(req);
    if (!sessionData) {
        sessionData = {
            message: '',
            email: ''
        }
    }

    res.render('customer/auth/login', { sessionData });
}

const signup = async (req, res, next) => {
    const insertData = req.body;


    const enteredData = {
        email: insertData.email,
        confirmEmail: insertData['confirm-email'],
        password: insertData.password,
        fullName: insertData['full-name'],
        street: insertData.street,
        postal: insertData['postal-code'],
        city: insertData.city
    };

    if (!validation.userDetailsAreValid(
        insertData.email,
        insertData.password,
        insertData['full-name'],
        insertData.street,
        insertData['postal-code'],
        insertData.city,
    ) || !validation.emailIsConfirmed(insertData.email, insertData['confirm-email'])) {

        flashMessage.flashDataToSession(req, {
            message: 'Invalid data - please double check your data.',
            ...enteredData
        },
            () => { res.redirect('/signup') }
        )
        return;
    }

    const user = new User(
        insertData['full-name'],
        insertData.email,
        insertData.password,
        insertData.street,
        insertData['postal-code'],
        insertData.city
    );

    try {
        const existAlready = await user.existAlready();
        if (existAlready) {
            flashMessage.flashDataToSession(req, {
                message: 'User already exist - maybe try to login now?',
                ...enteredData
            }, () => { res.redirect('/signup') }
            )
            return;
        }

        await user.save();

    } catch (error) {
        next(error);
        return;
    }
    res.redirect('/login');
}

const login = async (req, res, next) => {
    const user = new User(null, req.body.email, req.body.password);
    const sessionErrorMessage = {
        message: 'Invalid credentials - please check your email & password!',
        email: req.body.email,
        password: req.body.password
    };

    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        next(error)
        return;
    }

    if (!existingUser) {
        flashMessage.flashDataToSession(req, sessionErrorMessage, () => {
            res.redirect('/login');
        })
        return;
    }

    const checkUserPassword = await user.checkUserPassword(existingUser.password);
    if (!checkUserPassword) {
        flashMessage.flashDataToSession(req, sessionErrorMessage, () => {
            res.redirect('/login');
        })
        return;
    }
    authUtil.createUserSession(req, existingUser, () => { res.redirect('/products') });

}

const logout = async (req, res) => {
    authUtil.destoryUserSession(req);
    res.redirect('/');
}


module.exports = {
    getSignup,
    getLogin,
    signup,
    login,
    logout
}