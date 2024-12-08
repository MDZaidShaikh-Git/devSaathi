const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    //console.log(cookies);
    console.log(`The user logged in is ${user.firstName} ${user.lastName}`);
    res.send(user);
  } catch (error) {
    res.status(400).send("Error getting the user");
  }
});

module.exports = profileRouter;
