const Jwt = require("jsonwebtoken");

async function cashOutAuthorization(req, res, next) {
  const { token } = req.body;
  const auth = token && Jwt.verify(token, process.env.JWT_SECRET);

  try {
    if (!auth) {
      throw new Error("Unauthorized jwt");
    }
    next();
  } catch (error) {
    res.status(400).json({ status: "bad", error: "Unauthorized jwt" });
  }
}

module.exports = {
  cashOutAuthorization,
};
