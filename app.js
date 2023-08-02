require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const {
  server: { port },
  db: { dbUri },
  stripeConf: { stripe_secret },
} = require("./src/config/index");

app.use(cors());

const authRouter = require("./src/controllers/auth-cotroller");
const paymentRouter = require("./src/controllers/payment-controller");
const updateStatus = require("./src/controllers/updateStatus-controller");
const stripeResponse = require("./src/controllers/stripeResponse-controller");
const uploadFileRouter = require("./src/controllers/uploadFiles-controller");
const adminLoginRouter = require("./src/controllers/admin-controller");
const getData = require("./src/controllers/websiteData-controller");
const cashOut = require("./src/controllers/cashout-controller");
const myPayOuts = require("./src/controllers/myPayOuts-controller");
const getPayouts = require("./src/controllers/getPayOuts-controller");
const users = require("./src/controllers/users-controller");
const createPeymentIntent = require("./src/controllers/createClientIntent-controller");
const userChangeLogs = require("./src/controllers/editUserInfo-controller");
const connectDB = require("./src/db/index");

//db instance
connectDB(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/get-data", getData);
app.use("/auth", authRouter);
app.use("/pay", paymentRouter);
app.use("/stripe-res", stripeResponse);
app.use("/update-status", updateStatus);
app.use("/upload-file", uploadFileRouter);
app.use("/admin-login", adminLoginRouter);
app.use("/cash-out", cashOut);
app.use("/mypayouts", myPayOuts);
app.use("/get-payouts", getPayouts);
app.use("/users", users);
app.use("/create-payout", createPeymentIntent);
app.use("/edit/users/:id", userChangeLogs);
//-------------------------test.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("./src/schemas/User");
app.post("/connect-account", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const findAccount = await stripe.accounts.retrieve(`acct_1NXpeHR1Twt4rmwr`);

    const account = await stripe.accounts.create({
      type: "express",
    });
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "http://localhost:3000/demo",
      return_url: "http://localhost:3000/",
      type: "account_onboarding",
    });
    const updateUser = await User.updateOne(
      { _id: id },
      { $set: { payoutAccId: account.id } }
    );

    // console.log(account, accountLink, updateUser);
    console.log("🚀 ~ file: app.js:75 ~ app.post ~ findAccount:", findAccount);
    res.send({ payoutAccId: account.id, stripeUrl: accountLink.url });
  } catch (error) {}
});

//------------------update user data ===========

// --------------------------------------------------------
app.listen(port, () => console.log(`App is up and working on port ${port}`));
