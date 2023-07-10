const mongoose = require("mongoose");
const { Schema } = mongoose;

const date = new Date();

const paymentDate = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;

const payment = {
  paymentDate: { type: String, default: paymentDate },
  paymentId: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "users", unique: true },
};

const schema = new Schema(payment);

module.exports = mongoose.model("payments", schema);
