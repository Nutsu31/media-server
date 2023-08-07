const express = require("express");
const router = express.Router();
const {
  stripeConf: { stripe_secret },
} = require("../config/index");
const Payment = require("../schemas/Payments");

const stripe = require("stripe")(stripe_secret);
const {
  verifyJwtForStripe,
} = require("../middleware/stripeResponse-middleware");

router.get("/", verifyJwtForStripe, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*"); // Replace "*" with your client's origin URL for a more restricted setup.
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    const { clientId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(clientId);
    const paymentIntentId = session.payment_intent;

    // Confirm the payment using the PaymentIntent ID
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
    const paymentTicket = await Payment.create({ ...paymentIntent });

    if (!paymentIntent) {
      throw new Error("Error, paymentIntent doesn't exist");
    }
    res.send(paymentIntent);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
