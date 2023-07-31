const mongoose = require("mongoose");
const { Schema } = mongoose;
const payout = {
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "$",
  },
  id: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
};
const schema = new Schema(payout);
module.exports = mongoose.model("payouts", schema);
