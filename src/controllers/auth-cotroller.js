const express = require("express");
const router = express.Router();

const { register, login } = require("../services/auth-services");

router.post("/register", async (req, res) => {
  try {
    const registrationData = req.body;
    const result = await register(registrationData);

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
    res.status(200).send(authorizedUser);
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
