const express = require("express");
require("dotenv").config();
const router = express.Router();
const PayOut = require("../schemas/Payout");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { cashOutAuthorization } = require("../middleware/cashOut-middleware");

router.post("/", cashOutAuthorization, async (req, res, next) => {
  try {
    const { amount, destination, id } = req.body;
    const payout = await PayOut.insertMany({
      id: id,
      amount,
      destination,
    });
    console.log(req.body);
    res.send(payout);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
