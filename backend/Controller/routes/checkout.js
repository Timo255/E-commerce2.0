const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController")

router.route("/")
.post(checkoutController.handleCheckout);

module.exports = router;