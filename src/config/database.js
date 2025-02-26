const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Trying to connect");
  await mongoose.connect(

    //ADD CONNECTION STRING HERE
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

