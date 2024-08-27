const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const BlacklistedToken = require("../models/BlacklistedToken");


const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "User already exists",
      });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({
      success: true,
      msg: "User registered successfully",
      data: {
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      info: "Internal Server Error",
    });
  }
};


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email during login:", email);
    console.log("Password during login:", password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email);
      return res.status(401).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    // Compare the incoming password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    console.log("Password match status:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      msg: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      success: false,
      info: "Internal Server Error",
    });
  }
};




const logoutController = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "No token provided",
      });
    }

    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Create a new BlacklistedToken document with the token, userId, and its expiry date
    const blacklistedToken = new BlacklistedToken({
      token,
      expiresAt: new Date(decoded.exp * 1000), // Convert seconds to milliseconds
      userId: decoded.userId,
    });

    await blacklistedToken.save();

    res.json({
      success: true,
      msg: "Logout successful",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({
      success: false,
      info: "Internal Server Error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
