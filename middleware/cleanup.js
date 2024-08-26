const mongoose = require("mongoose");
const BlacklistedToken = mongoose.model("BlacklistedToken");

const cleanupExpiredTokens = async () => {
  await BlacklistedToken.deleteMany({ expiresAt: { $lte: new Date() } });
};

// Running the cleanup function every hour
setInterval(cleanupExpiredTokens, 60 * 60 * 1000);

module.exports = { cleanupExpiredTokens };
