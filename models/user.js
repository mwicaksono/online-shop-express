const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const db = require('../data/database');
const ObjectId = mongodb.ObjectId;

class User {
    constructor(id, name, email, password, street, postalCode, city, isAdmin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = {
            street,
            postalCode,
            city
        };
        this.isAdmin = isAdmin;
        if (this.id) {
            this.id = ObjectId(id);
        }
    }

    getUserWithSameEmail() {
        const user = db.getDb().collection('users').findOne({
            email: this.email
        });
        return user;
    }

    async save() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        const result = await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address,
            isAdmin: this.isAdmin
        });
        return result;
    }
}

module.exports = User;