const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { createCheckoutSession } = require("../services/payment-services");

router.post("/", async (req, res) => {
  try {
    const session = await createCheckoutSession(req.body.jwt);
    console.log(session);
    res.json({ session });
  } catch (error) {
    console.log("error occured in payment: ", error);
  }
});

module.exports = router;
