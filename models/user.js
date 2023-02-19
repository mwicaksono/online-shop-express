const bcrypt = require('bcryptjs');
const db = require('../data/database');

class User {
    constructor(name, email, password, street, postalCode, city) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = {
            street,
            postalCode,
            city
        };
    }

    getUserWithSameEmail() {
        return db.getDb().collection('users').findOne({
            email: this.email
        });
    }

    async existAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser) {
            return true;
        }
        return false;
    }

    async checkUserPassword(hashedPassword) {
        const decryptedPassword = await bcrypt.compare(this.password, hashedPassword)
        return decryptedPassword;
    }

    async save() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        const result = await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address,
        });
        return result;
    }
}

module.exports = User;