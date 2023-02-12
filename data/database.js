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
        // throw {
        //     message: 'Database Counldnt Connect!, try again later'
        // }
        throw new Error('You Must Connect First!');
    }
    return database;
}

module.exports = {
    connectToDatabase, getDb
}

