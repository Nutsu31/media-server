const User = require("../schemas/User");

const { validateHash, createJWT, hash } = require("../utils/index");
const userOPTVErification = require("../schemas/Verify");

async function register(data) {
  try {
    if (!Object.keys(data).length) {
      throw { statusCode: 400, message: "bad request" };
    }
    const { email, password, ...rest } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw { statusCode: 409, message: "user already exist" };
    }
    const newUser = (
      await User.create({ email, password, ...rest })
    ).toObject();
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

async function forgetPassword(body) {
  try {
    const { email, otp } = body;
    console.log("opt", otp);
    if (!email || !otp) {
      throw Error("Empty opt details are not allowed");
    } else {
      const existingUser = await User.findOne({ email });
      const verifyFinder = await userOPTVErification.find({ email });
      console.log("existingUser", existingUser);
      if (!existingUser) {
        throw { statusCode: 409, message: "user isn't register yet" };
      }

      if (verifyFinder.length > 0) {
        await userOPTVErification.deleteMany({ email });
      }

      const hashOtp = await hash(otp);
      const verify = await new userOPTVErification({
        email: email,
        otp: hashOtp,
        verify: false,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      }).save();

      console.log("verify", verify);

      return verify;
    }
  } catch (error) {
    throw error;
  }
}

async function verifyCode(body) {
  try {
    const { email, otp } = body;
    if (!email || !otp) {
       throw Error("Empty otp details are not allowed");
    } else {
      const existingUser = await userOPTVErification.findOne({ email });
      if (!existingUser) {
        throw Error("email not find");
      } else {
        if (existingUser.expiresAt < Date.now()) {
          await userOPTVErification.deleteMany({ email });
          throw Error("time is over, please sent email again");
        } else {
          const compareOTP = await validateHash(otp, existingUser.otp);
          if (!compareOTP) {
            throw Error("code isn't correct");
          } else {
            const updateVerify = await userOPTVErification.updateOne(
              { email: email },
              { verify: true }
            );
            return updateVerify;
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
}

async function changePassword(body) {
  try {
     const { email, password } = body;
     if (!email || !password) {
       throw Error("Empty password");
     } else{
        const existingUser = await userOPTVErification.findOne({
          email: email,
          verify: true,
        });
        if(!existingUser){
          throw Error("Start changing the password again ");
        } else{
          const hashPass = await hash(password);
          const changePassword = await User.updateOne(
            { email: email },
            { password: hashPass}
          );
          await userOPTVErification.deleteMany({ email });
          return changePassword;
        }
     }

  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  login,
  forgetPassword,
  verifyCode,
  changePassword,
};
