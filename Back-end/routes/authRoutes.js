const express = require("express");
const { signUp, login, googleLogin } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp); // Sign-Up User
router.post("/login", login); // Login User
router.post("/google-login", googleLogin); // Google Login

module.exports = router;
