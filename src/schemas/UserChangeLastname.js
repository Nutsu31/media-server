const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserChangeLastName = {
  before_lastName: { type: String, default: "" },
  after_lastName: { type: String, default: "" },
  user_id: { type: String, required: true, default: "" },
  created_at: { type: String, required: true, default: Date.now() },
  updated_at: { type: String, required: true, default: Date.now() },
};
const schema = new Schema(UserChangeLastName);
module.exports = mongoose.model("userChangeLastName", schema);
