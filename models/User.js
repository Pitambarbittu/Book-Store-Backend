const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware that runs before saving a user document
userSchema.pre("save", async function (next) {
  // Check if the password field is modified or if it's a new document
  if (this.isModified("password") || this.isNew) {
    // Hash the password with bcrypt before saving it to the database
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// This is the Method to compare a user password with the stored hashed password
userSchema.methods.comparePassword = function (candidatePassword) {
  // Using bcrypt to compare the provided password with the stored hashed password
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
