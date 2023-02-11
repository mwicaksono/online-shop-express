const Product = require('../models/product');

const allProducts = async (req, res) => {
    const products = await Product.fetchAll();
    res.render('menu/products', { products });
}
module.exports = {
    allProducts
}