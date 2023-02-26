const Product = require('../models/product');
const validation = require('../utils/validation');
const flashMessage = require('../utils/flash-message');

const getProducts =  async (req, res) => {
    const products = await Product.fetchAll();
    res.render('admin/products/all-products', { products });
}

const getNewProduct = (req, res) => {

    let sessionData = flashMessage.getSessionData(req);
    if (!sessionData) {
        sessionData = {
            message: '',
            name: '',
            description: '',
            price: ''
        }
    }
    res.render('admin/products/new-product', { sessionData });
}

const createNewProduct = async (req, res, next) => {
    const insertData = req.body;

    const enteredData = {
        product: insertData.product,
        description: insertData.description,
        price: insertData.price
    };

    if (!validation.productArevalid(
        insertData.product,
        insertData.description,
        insertData.price
    )) {
        flashMessage.flashDataToSession(req, {
            message: 'Invalid data - please double check your data.',
            ...enteredData
        },
            () => { res.redirect('/admin/products/new') }
        )
        return;
    } 

    const product = new Product(
        null,
        insertData.product,
        insertData.description,
        insertData.price,
        null
    );

    try {
        await product.save();
    } catch (error) {
        next(error);
        return;
    }

    res.redirect('/admin/products/new');
}

module.exports = {
    getProducts, getNewProduct, createNewProduct
}