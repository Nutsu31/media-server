const express = require("express");
const router = express.Router();

const WebsiteDatas = require("../schemas/Test");

router.get("/", async (req, res) => {
  try {
    const data = await WebsiteDatas.find();
    if (!data)
      return res
        .status(403)
        .json({ status: "bad", data: { message: "No Data" } });

    res.status(200).json({ status: "ok", data });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
