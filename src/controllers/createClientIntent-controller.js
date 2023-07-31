const express = require("express");
require("dotenv").config();
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Jwt = require("jsonwebtoken");

const { cashOutAuthorization } = require("../middleware/cashOut-middleware");
router.post("/", async (req, res, next) => {
  try {
    // const { token, amount } = req.query;
    // const { amount, currency, destination } = req.body;
    console.log(
      "🚀 ~ file: createClientIntent-controller.js:12 ~ router.post ~ req.body:",
      req.body
    );
    // const auth = token && Jwt.verify(token, process.env.JWT_SECRET);

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount,
    //   currency: "usd",
    //   automatic_payment_methods: { enabled: true },
    // });
    // const payout = await stripe.payouts.create({
    //   amount: amount, // Amount in cents
    //   currency: currency,
    //   destination: destination, // Bank account or card ID
    //   // metadata: metadata, // Optional metadata
    // });
    const { amount, currency, destination } = req.body;

    // Create a transfer to the connected account
    const transfer = await stripe.transfers.create({
      amount: amount,
      currency: currency,
      destination: destination, // Connected account ID
    });
    console.log(transfer);
    res.send({ transfer });
    // console.log(payout);

    // if (payout) return res.send(payout);
    // throw new Error();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
