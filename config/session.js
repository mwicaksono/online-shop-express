const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

const createSessionStore = () => {
    const MongoDBStore = mongoDbStore(expressSession);
    const store = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'onlineShop',
        collection: 'sessions'
    });
    return store;
}

const createSessionConfig = () => {
    return {
        secret: 'supert-secret',
        resave: false,
        saveUnitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 3000
        }
    }
}

module.exports = createSessionConfig;