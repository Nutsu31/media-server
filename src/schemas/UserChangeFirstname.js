const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserChangeFirstName = {
  before_firstName: { type: String, default: "" },
  after_firstName: { type: String, default: "" },
  user_id: { type: String, required: true, default: "" },
  created_at: { type: String, required: true, default: Date.now() },
  updated_at: { type: String, required: true, default: Date.now() },
};
const schema = new Schema(UserChangeFirstName);
module.exports = mongoose.model("UserChangeFirstName", schema);
