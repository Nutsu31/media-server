require("dotenv").config("../../.env");
const jwt = require("jsonwebtoken");

const {
  stripeConf: { stripe_secret },
} = require("../config/index");

const stripe = require("stripe")(stripe_secret);

async function createCheckoutSession(jwtToken) {
  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
  if (!decode) {
    throw new Error("Invalid JWT"); // Throw an error if the JWT verification fails
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: "All life subscription",
          },
          unit_amount: 97 * 100,
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  return session;
}

module.exports = {
  createCheckoutSession,
};
