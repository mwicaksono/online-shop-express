const express = require('express');

const AdminController = require('../controllers/admin-controller');
const router = express.Router();

// GET Routes
router.get('/products', AdminController.getProducts);
router.get('/products/new', AdminController.getNewProduct);

// POST Routes
router.post('/products/save', AdminController.createNewProduct);


module.exports = router;