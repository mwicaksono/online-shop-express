const express = require('express');

const router = express.Router();

// GET Routes
router.get('/', (req, res) => {
    res.redirect('/products');
});


module.exports = router;