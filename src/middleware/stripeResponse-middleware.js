const Jwt = require("jsonwebtoken");

async function verifyJwtForStripe(req, res, next) {
  const { jwtFromHeader } = req.query;
  const auth =
    jwtFromHeader && Jwt.verify(jwtFromHeader, process.env.JWT_SECRET);

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
  verifyJwtForStripe,
};
