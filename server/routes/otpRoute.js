const express = require("express");
const { sendOtpOnMail, verifyOtp } = require("../controllers/otpCtrl");
const {
  authMiddleware,
  isAdmin,
  isSuper,
} = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/send", sendOtpOnMail);
router.post("/verify", verifyOtp);
module.exports = router;
