const express = require('express');

const ProductController = require('../controllers/product-controller');

const router = express.Router();

router.get('/product', ProductController.allProducts);

module.exports = router;