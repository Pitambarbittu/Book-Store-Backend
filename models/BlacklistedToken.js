const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blacklistedTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlacklistedToken = mongoose.model( "BlacklistedToken", blacklistedTokenSchema);
module.exports = BlacklistedToken;
