const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logouteController')

router.route("/")
.get(logoutController.logoutUser);

module.exports = router;