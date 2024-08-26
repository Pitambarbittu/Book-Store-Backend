const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const tokenValidator = require("../middleware/authMiddleware");

router.post("/register", authController.registerController);
router.post("/login", authController.loginController);
router.post("/logout", tokenValidator, authController.logoutController);

module.exports = router;
