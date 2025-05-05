const express = require('express');
const router = express.Router();
const allProductsController = require('../controllers/productsController');

router.route('/')
.get(allProductsController.getAllproducts)


router.route('/sliderProducts')
.get(allProductsController.getSliderProducts)

router.route('/newProducts')
.get(allProductsController.getNewProducts)

router.route('/offer')
.get(allProductsController.getOffer)

router.route('/queryProducts')
.get(allProductsController.getQueryProducts)

router.route('/relatedProducts')
.get(allProductsController.getRelatedProducts)

router.route('/ById')
.get(allProductsController.getProductsById)

module.exports = router;