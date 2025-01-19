const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  console.log("Trying to connect");
  await mongoose.connect(
  //import the envireonment variables
   
    console.log(process.env.MONGODB_CONNECTION_STRING),
   await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
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
