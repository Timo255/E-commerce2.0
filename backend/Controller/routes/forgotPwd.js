const express = require("express");
const router = express.Router();
const forgotPwdController = require("../controllers/forgotPwdController");

router.route("/")
.post(forgotPwdController.handleForgotPwd);

router.route("/verify-reset-token")
.post(forgotPwdController.handleVerifyResetToken);

router.route("/reset-password")
.post(forgotPwdController.handleResetPwd);

module.exports = router;