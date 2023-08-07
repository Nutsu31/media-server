const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { createCheckoutSession } = require("../services/payment-services");

router.post("/", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*"); // Replace "*" with your client's origin URL for a more restricted setup.
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    const session = await createCheckoutSession(req.body.jwt);
    console.log(session);
    res.json({ session });
  } catch (error) {
    console.log("error occured in payment: ", error);
  }
});

module.exports = router;
