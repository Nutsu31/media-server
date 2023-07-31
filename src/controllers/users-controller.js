const express = require("express");
const router = express.Router();
const Users = require("../schemas/User");

router.get("/", async (req, res) => {
  try {
    const getAllUsers = await Users.find();
    if (getAllUsers) return res.status(200).json({ status: "ok", getAllUsers });
    throw new Error("Users Not Found");
  } catch (error) {
    res.status(403).json({ status: "bad", error: "Users Not Found" });
  }
});

module.exports = router;
