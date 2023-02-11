const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
    const client = await MongoClient.connect(
        'mongodb://127.0.0.1:27017'
    );
    database = client.db('onlineShop');
}

function getDb() {
    if (!database) {
        throw { message: 'Database couldnt connect!' };
    }
    return database;
}

module.exports = {
    connectToDatabase, getDb
}