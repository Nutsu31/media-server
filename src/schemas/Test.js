const mongoose = require("mongoose");
const { Schema } = mongoose;
const { hash } = require("../utils/index");
const user = {
  FirstName: { type: String },
  domain: { type: String },
  language: { type: String },
  niche: { type: String },
  adNetwork: { type: String },
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
