const Book = require("../models/Book");

const getBooksController = async (req, res) => {
  try {
    const books = await Book.find();

    if (books.length > 0) {
      res.json({
        success: true,
        booksCount: books.length,
        data: books,
      });
    } else {
      res.json({
        success: false,
        msg: "No books found.",
      });
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      success: false,
      info: "Internal Server Error",
    });
  }
};

const addBookController = async (req, res) => {
  try {
    const { title, author, gender } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        success: false,
        msg: "Title and author are required",
      });
    }
    const book = new Book({ title, author, gender });

    await book.save();

    res.json({
      success: true,
      msg: "Book added successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({
      success: false,
      info: "Internal Server Error",
    });
  }
};

const updateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, gender } = req.body;

    if (!title && !author && !gender) {
      return res.status(400).json({
        success: false,
        msg: "At least one field (title or author) is required to update",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(title && { title }),
          ...(author && { author }),
          ...(gender && { gender }),
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        msg: "Book not found",
      });
    }

    res.json({
      success: true,
      msg: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({
      success: false,
      info: "Internal Server Error",
    });
  }
};

const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        msg: "Book not found",
      });
    }

    res.json({
      success: true,
      msg: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({
      success: false,
      info: "Internal Server Error",
    });
  }
};

module.exports = {
  getBooksController,
  addBookController,
  updateBookController,
  deleteBookController,
};
