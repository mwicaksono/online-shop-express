const createUserSession = (req, user, action) => {
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.save(action);
}

const destoryUserSession = (req) => {
    req.session.uid = null;
    req.session.destroy();
}

module.exports = {
    createUserSession,
    destoryUserSession
}