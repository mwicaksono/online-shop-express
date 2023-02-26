const db = require('../data/database');

class Product {
    constructor(id, name, description, price, path) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.path = path;
    }

    static async fetchAll() {
        const products = await db.getDb().collection('products').find().toArray();
        return products;
    }

    async save() {

        const result = await db.getDb().collection('products').insertOne({
            name: this.name,
            description: this.description,
            price: this.price,
            path: this.path
        });
        return result;
    }

}

module.exports = Product; 