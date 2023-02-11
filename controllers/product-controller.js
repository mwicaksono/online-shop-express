const Product = require('../models/product');

const allProducts = async (req, res) => {
    const products = await Product.fetchAll();
    res.render('products/products', { products });
}
module.exports = {
    allProducts
}