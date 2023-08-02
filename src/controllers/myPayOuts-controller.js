const express = require("express");
const router = express.Router();
const PayOut = require("../schemas/Payout");
const jwt = require("jsonwebtoken");
const { cashOutAuthorization } = require("../middleware/cashOut-middleware");

router.post("/", async (req, res) => {
  try {
    const { token } = req.body;

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const payments = id && (await PayOut.find({ id }));

    if (payments) return res.send(payments);
    throw new Error("Can't find any payments");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
