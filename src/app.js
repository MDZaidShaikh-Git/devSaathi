const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const validateSignUpData = require("./utils/validation");
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const cors = require("cors")

app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user")
// //Sign Up API
// app.post("/signUp", async (req, res) => {
//   console.log(req.body);

//   //validateSignUpData(req);

//   try {
//     const {
//       password,
//       firstName,
//       lastName,
//       emailId,
//       age,
//       gender,
//       photoUrl,
//       about,
//       skills,
//     } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);
//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       age,
//       gender,
//       photoUrl,
//       about,
//       skills,
//       password: passwordHash,
//     });
//     await user.save();
//     res.send("Data added successfully");
//   } catch (error) {
//     res.status(400).send("Error saving data: " + error.message);
//   }
// });

// //Sign In API
// app.post("/signin", async (req, res) => {
//   try {
//     const { password, emailId } = req.body;
//     const user = await User.findOne({ emailId: emailId });
//     if (!user) {
//       //throw new Error("User with the email id doesnt exist")
//       throw new Error("Invalid Credentials");
//     }
//     const isPasswordValid = await user.validatePassword(password);

//     if (isPasswordValid) {
//       //Create a JWT Token
//       const token = await user.getJWT();
//       console.log(token);

//       //Add the token to cookie and send the response back to the server
//       res.cookie("token", token, {
//         expires: new Date(Date.now() + 8 * 3600000),
//         httpOnly: true,
//       });

//       res.send("Login Successful");
//     } else {
//       //throw new Error("Password not correct");
//       throw new Error("Invalid Credentials");
//     }
//   } catch (error) {
//     res.status(400).send("Error saving data: " + error.message);
//   }
// });

// //getting a profile
// app.get("/profile", userAuth, async (req, res) => {
//   try {
//     const user = req.user;
//     //console.log(cookies);
//     console.log(`The user logged in is ${user.firstName} ${user.lastName}`);
//     res.send(user);
//   } catch (error) {}
// });

// {
// //Get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });

//     if (users.length === 0) {
//       res.status(404).send("No user found");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //Get all the users
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) {
//       res.status(404).send("No user found");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //Get only one user
// app.get("/uniqueUser", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const user = await User.findOne({ emailId: userEmail });
//     if (!user) {
//       res.send("No user found");
//     } else {
//       res.send(user);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// app.get("/getById", async (req, res) => {
//   try {
//     const userId = req.body._id;
//     const user = await User.findById({ _id: userId });
//     if (!user) {
//       res.status(404).send("No user found");
//     } else {
//       res.send(user);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //delete user from the database
// app.delete("/user", async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const user = await User.findByIdAndDelete(userId);
//     if (!user) {
//       res.status(404).send("No user found");
//     } else {
//       res.send(user);
//       // res.send("Above user was successfully deleted");
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //updating user information
// app.patch("/user", async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const data = req.body;
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//     });
//     const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }
//     console.log(user);
//     res.send("User updated successfully");
//   } catch (error) {
//     res.status(400).send("Update Failed" + error.message);
//   }
// });

// }

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!");
  });
