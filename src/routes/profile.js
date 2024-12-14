const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    //console.log(cookies);
    console.log(`The user logged in is ${user.firstName} ${user.lastName}`);
    res.send(user);
  } catch (error) {
    res.status(400).send("Error getting the user");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request");
    }
    const LoggedInuser = req.user;

    Object.keys(req.body).forEach((key) => (LoggedInuser[key] = req.body[key]));
    await LoggedInuser.save();
    res.json({
      message: `${LoggedInuser.firstName} your profile was updated successfully`,
      data: LoggedInuser,
    });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
