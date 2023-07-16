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

const authRouter = require("./src/controllers/auth-cotroller");
const paymentRouter = require("./src/controllers/payment-controller");
const updateStatus = require("./src/controllers/updateStatus-controller");
const stripeResponse = require("./src/controllers/stripeResponse-controller");
const uploadFileRouter = require("./src/controllers/uploadFiles-controller");
const adminLoginRouter = require("./src/controllers/admin-controller");
const getData = require("./src/controllers/websiteData-controller");
const connectDB = require("./src/db/index");

//db instance
connectDB(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options("*", cors());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://checkout.stripe.com"],
  })
);

app.get("/health_check", async (req, res) => {
  try {
    res.send("Health check working correct");
  } catch (error) {
    console.log("error", error);
    res.send(error);
  }
});

app.use("/get-data", getData);
app.use("/auth", authRouter);
app.use("/pay", paymentRouter);
app.use("/stripe-res", stripeResponse);
app.use("/update-status", cors(), updateStatus);
app.use("/upload-file", uploadFileRouter);
app.use("/admin-login", adminLoginRouter);
const Users = require("./src/schemas/User");

app.get("/users", async (req, res) => {
  try {
    const getAllUsers = await Users.find();
    if (getAllUsers) return res.status(200).json({ status: "ok", getAllUsers });
    throw new Error("Users Not Found");
  } catch (error) {
    res.status(403).json({ status: "bad", error: "Users Not Found" });
  }
});

app.listen(port, () => console.log(`App is up and working on port ${port}`));
