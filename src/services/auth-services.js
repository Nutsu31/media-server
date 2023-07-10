const User = require("../schemas/User");

const { validateHash, createJWT } = require("../utils/index");


async function register(data) {
  try {
    if (!Object.keys(data).length) {
      throw { statusCode: 400, message: "bad request" };
    }
    const { email,password,...rest } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw { statusCode: 409, message: "user already exist" };
    }
    const newUser = (await User.create({ email,password,...rest })).toObject();
    return newUser;
  } catch (error) {
    console.log("error occurred in register function", error);
    throw error;
  }
}

async function login(userData) {
  try {
    if (!Object.keys(userData).length) {
      throw { statusCode: 400, message: "fields cannot be empty" };
    }
    const { email, password } = userData;
    const user = await User.findOne({ email });
    const isValidPassword = await validateHash(password, user.password);

    if (isValidPassword && email === user.email) {
      const jwtData = { id: user._id.toString() };
      const jwt = await createJWT(jwtData);
      return { jwt, user };
    }
    throw { statusCode: 400, message: "credentials not valid" };
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
}

module.exports = {
  register,
  login,
};
