const db = require('../data/database');

class Product {
    constructor(id, name, description, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    static async fetchAll() {
        const products = await db.getDb().collection('products').find().toArray();
        return products;
    }
}

module.exports = Product;