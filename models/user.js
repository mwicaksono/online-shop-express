const db = require('../data/database');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class User {
    constructor(id, name, email, password, address, isAdmin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.isAdmin = isAdmin;
        if (this.id) {
            this.id = ObjectId(id);
        }
    }

    async save() {
        const result = await db.getDb().collection('users').insertOne({
            name: this.name,
            email: this.email,
            password: this.password,
            address: this.address,
            isAdmin: this.isAdmin
        });
        return result;
    }

    async delete() {

    }
}

module.exports = User;