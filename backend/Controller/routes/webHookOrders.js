const express = require("express");
const router = express.Router();
const webHookController = require("../controllers/webHookController");

router.route("/")
.post(webHookController.handleWebhook);

module.exports = router;