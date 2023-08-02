const express = require("express");
const router = express.Router();
const { generateReferralLink } = require("../utils/affiliate");
const User = require("../schemas/User");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { register, login } = require("../services/auth-services");

router.post("/register", async (req, res) => {
  try {
    const registrationData = req.body;
    const { email, referralEmail, referralId } = req.body;

    const result = await register(registrationData);

    const updateUser = referralId
      ? await User.updateOne(
          { _id: referralId },
          { $push: { referral: registrationData } }
        )
      : referralEmail &&
        (await User.updateOne(
          { email: referralEmail },
          { $push: { referral: registrationData } }
        ));

    res.status(200).send(result);
  } catch (error) {
    console.log("error occurred in register route: ", error);
    let response;

    switch (error.statusCode) {
      case 400: {
        response = { ...error };
        break;
      }
      case 409: {
        response = { ...error };
        break;
      }
      default: {
        response = { message: "server error", statusCode: 500 };
      }
    }
    res.send(response);
  }
});

router.post("/login", async (req, res) => {
  try {
    const authorizedUser = await login(req.body);

    const refLink = generateReferralLink(authorizedUser.user._id);
    console.log(refLink);
    res.status(200).send({ ...authorizedUser, referralLink: refLink });
  } catch (error) {
    console.log("error occuired in auth route: ", error);
    let response;

    switch (error.statusCode) {
      case 400:
        {
          response = { ...error };
        }
        break;
      default: {
        response = { message: "server error", statusCode: 500 };
      }
    }
    res.send(response);
  }
});

module.exports = router;
