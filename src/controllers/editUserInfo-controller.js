const express = require("express");
require("dotenv").config();
const router = express.Router();
const UserFirstName = require("../schemas/UserChangeFirstname");
const UserLastName = require("../schemas/UserChangeLastname");
const jwt = require("jsonwebtoken");
const User = require("../schemas/User");

router.put("/", async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const getUser = await User.findOne({ _id: id });

    if (firstName && !lastName) {
      const findUser = await User.updateOne(
        { _id: id },
        { $set: { firstName: firstName } }
      );
      await UserFirstName.insertMany({
        before_firstName: getUser.firstName,
        after_firstName: firstName,
        user_id: id,
      });
      res.status(200).send(findUser);
    } else if (!firstName && lastName) {
      const findUser = await User.updateOne(
        { _id: id },
        { $set: { lastName: lastName } }
      );
      await UserLastName.insertMany({
        before_lastName: getUser.lastName,
        after_lastName: lastName,
        user_id: id,
      });
      res.status(200).send(findUser);
    } else {
      throw new Error("");
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
});

module.exports = router;
