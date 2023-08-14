const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
  email: String,
  otp: String,
  verify: Boolean,
  createdAt: Date,
  expiresAt: Date,
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
