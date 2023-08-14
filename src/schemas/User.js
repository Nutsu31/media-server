const mongoose = require("mongoose");
const { Schema } = mongoose;
const { hash } = require("../utils/index");
const user = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  verified: { type: Boolean, default: true },
  payment: { type: String },
  referral: { type: Array },
  referralEmail: { type: String },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
  payoutAccId: { type: String, default: "" },
};
const schema = new Schema(user);
schema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPassword = await hash(this.password);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    console.log("error in pre method save: ", error);
    throw error;
  }
});
module.exports = mongoose.model("users", schema);
