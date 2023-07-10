const Jwt = require("jsonwebtoken");

async function verifyUser(req, res, next) {
  const { jwt } = req.body;
  const verify = jwt && (await Jwt.verify(jwt, process.env.JWT_SECRET));
  console.log("🚀 ~ file: index.js:28 ~ verifyUser ~ jwt:", verify);
  try {
    if (!verify) {
      throw new Error("Unauthorized entry");
    }
    next();
  } catch (error) {
    res.status(400).json({ status: "bad", error: "Unauthorized entry" });
  }
}

module.exports = {
  verifyUser,
};
