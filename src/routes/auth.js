const express = require("express");

const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const jwt = require("jsonwebtoken");
//Sign Up API
authRouter.post("/signUp", async (req, res) => {
  console.log(req.body);

  //validateSignUpData(req);

  try {
    const {
      password,
      firstName,
      lastName,
      emailId,
      age,
      gender,
      photoUrl,
      about,
      skills,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      age,
      gender,
      photoUrl,
      about,
      skills,
      password: passwordHash,
    });
    const savedUser = await user.save();
    // res.send("Data added successfully");
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({message:"Data added successfully",data:savedUser}); 
  } catch (error) {
    res.status(400).send("Error saving data: " + error.message);
  }
});

//Sign In API
authRouter.post("/signin", async (req, res) => {
  try {
    const { password, emailId } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      //throw new Error("User with the email id doesnt exist")
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //Create a JWT Token
      const token = await user.getJWT();
      console.log(token);

      //Add the token to cookie and send the response back to the server
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
      });

      res.send(user );
    } else {
      //throw new Error("Password not correct");
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error saving data: " + error.message);
  }
});

//logout API
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Successfully loggedout!!");
});

module.exports = authRouter;
