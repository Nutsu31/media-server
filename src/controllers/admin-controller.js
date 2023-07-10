const express = require("express");
const router = express.Router();
require("dotenv").config();
router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (
    email !== process.env.ADMIN_EMAIL &&
    password !== process.env.ADMIN_PASSWORD
  )
    return res
      .status(401)
      .json({ status: "bad", message: "Incorrect Email Address or Password" });
  if (
    email !== process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  )
    return res
      .status(401)
      .json({ status: "bad", message: "Incorrect Email Address" });
  if (
    email === process.env.ADMIN_EMAIL &&
    password !== process.env.ADMIN_PASSWORD
  )
    return res
      .status(401)
      .json({ status: "bad", message: "Incorrect Password" });

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res
      .status(200)
      .json({ status: "ok", message: "Admin Logged in successful" });
  }
});

module.exports = router;
