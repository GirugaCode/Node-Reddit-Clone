/* Mongoose Connection */
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/reddit-db";

mongoose.set("strictQuery", true);
mongoose.set("debug", process.env.NODE_ENV !== "production");

mongoose.connect(url)
  .then(() => {
    console.log("Connected successfully to database");
  })
  .catch((err) => {
    console.error("MongoDB connection Error:", err);
  });

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));

module.exports = mongoose.connection;
