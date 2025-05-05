const express = require("express");
const router = express.Router();
const userOrderController = require("../controllers/userOrderController")

router.route("/")
.get(userOrderController.handleOrders)

router.route("/delete/:id")
.delete(userOrderController.handleDeleteOrder)

module.exports = router;