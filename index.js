require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 3000;

const backendApi = express();

// Middleware
backendApi.use(cors());
backendApi.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongoose connected!"))
  .catch((err) => console.error("Mongoose connection error:", err));

// Route handlers
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const protectedRoutes = require("./controllers/protectedRoutes");

console.log("Setting up routes");

backendApi.use("/api/v1/auth", authRoutes);
backendApi.use("/api/v1", bookRoutes);
backendApi.use("/api/v1", protectedRoutes);

//server
backendApi.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
