const mongoose = require("mongoose");
const { Schema } = mongoose;
const { hash } = require("../utils/index");
const user = {
  Name: { type: String },
  Website: { type: String },
  Description: { type: String },
  Country: { type: String },
  Founded: { type: Number },
  Industry: { type: String },
  Id: { type: Number },
  FirstName: { type: String },
  LastName: { type: String },
  Age: { type: Number },
  Country: { type: String },
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
module.exports = mongoose.model("RandomPeople", schema);
