const mongoose = require("mongoose");
const { Schema } = mongoose;
const { hash } = require("../utils/index");
const user = {
  Name: { type: String },
  Domain: { type: String },
  Language: { type: String },
  Niche: { type: String },
  Email: { type: String },
  AdNetwork: { type: String },
  Added: { type: Number, default: Date.now() },
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
module.exports = mongoose.model("WebsiteDatas", schema);
