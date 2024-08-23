const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    success: true,
    msg: "This is a protected route",
    user: req.user,
  });
});

module.exports = router;
