const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlacklistedToken");

const authMiddleware = async (req, res, next) => {
  // Extracting the token from the "Authorization" header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, respond with a 401 Unauthorized status
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "No token provided",
    });
  }

  try {
    // Check if the token is blacklisted
    const blacklisted = await BlacklistedToken.findOne({ token });

    if (blacklisted) {
      return res.status(401).json({
        success: false,
        msg: "Token has been invalidated. Please log in again.",
      });
    }
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({
      success: false,
      msg: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
