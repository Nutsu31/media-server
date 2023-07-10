const mongoose = require("mongoose");

function connectDB(uri) {
  return mongoose
    .connect(uri)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => {
      console.log(`db connection error: ${err}`);
      throw err;
    });
}

module.exports = connectDB;
