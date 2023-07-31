const express = require("express");
const router = express.Router();
const PayOut = require("../schemas/Payout");

router.get("/", async (req, res) => {
  try {
    const allPayOuts = await PayOut.find();
    if (allPayOuts) return res.send(allPayOuts);
    throw new Error("There is no transaction history");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
