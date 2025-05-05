const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");


router.route("/").post(cartController.addProductCart);

router.route("/").get(cartController.getCartProducts);

router.route("/:productId").put(cartController.updateQuantity);

router.route("/:productId").delete(cartController.deleteCartItem);
router.route("/clearCart").get(cartController.handleClearCart)


module.exports = router;
