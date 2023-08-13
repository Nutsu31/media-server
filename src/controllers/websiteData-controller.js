const express = require("express");
const router = express.Router();

const WebsiteDatas = require("../schemas/SiteDatas");

router.get("/", async (req, res) => {
  const { page, limit } = req.query;
  console.log(page, limit);
  try {
    const data = await WebsiteDatas.find()
      .skip((page - 1) * limit)
      .limit(limit * 4 * page);

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
