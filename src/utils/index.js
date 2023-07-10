require("dotenv").config("../../.env");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schemas/User");

const {
  jwtConf: { secret },
} = require("../config/index");

async function hash(data, hashLength = 10) {
  const salt = await bcrypt.genSalt(hashLength);
  const hashedPassword = await bcrypt.hash(data, salt);
  return hashedPassword;
}

async function validateHash(hash, dbHash) {
  return await bcrypt.compare(hash, dbHash);
}

async function createJWT(data) {
  console.log("@@@@@@@@@@@@@@@@@secretttttt", secret);
  return jwt.sign({ ...data }, secret);
}

module.exports = {
  hash,
  validateHash,
  createJWT,
};
