const express = require("express");
const router = express.Router();
const User = require("../schemas/User");
const { verifyUser } = require("../middleware/updateuser-middleware");

router.put("/", verifyUser, async (req, res) => {
  const { email } = req.body;
  const updateUser = await User.findOneAndUpdate(
    { email: email },
    { $set: { isActivated: true, payment: "succeeded" } }
  );
  console.log("🚀 ~ file: app.js:96 ~ app.put ~ updateUser:", updateUser);
  res.send({ status: "ok", updateUser });
});

module.exports = router;
