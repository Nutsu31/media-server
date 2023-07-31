const mongoose = require("mongoose");
const { Schema } = mongoose;
const affiliate = {
  referralId: { type: String },
  amount: { type: Number },
  createdAt: { type: Date, default: Date.now() },
};

const schema = new Schema(affiliate);

module.exports = mongoose.model("affiliate", schema);
