const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Trying to connect");
  await mongoose.connect(
    "mongodb+srv://learningthroughchatgpt:faNLPVyKXX3Bi6ic@zaidsnamastenode.fbtuk.mongodb.net/devSaathi"
  );
};

module.exports = connectDB;

// connectDB()
//   .then(() => {
//     console.log("Database connection established");
//   })
//   .catch((err) => {
//     console.log("Database cannot be connected!");
//   });
