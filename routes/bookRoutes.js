const express = require("express");
const router = express.Router();
const bookController = require("../controllers/BookController");
const authController = require("../middleware/authMiddleware");

router.get("/books", authController, bookController.getBooksController);
router.post("/books", authController, bookController.addBookController);
router.put("/books/:id", authController, bookController.updateBookController);
router.delete("/books/:id",authController,bookController.deleteBookController);

module.exports = router;
