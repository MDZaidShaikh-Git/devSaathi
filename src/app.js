const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

//HANDLE AUTH MIDDLEWARE
app.use(
  "/admin",
  adminAuth

  //   (req, res, next) => {
  //   const token = "xyz";
  //   const isAdminAuthorised = token === "xy";
  //   if (!isAdminAuthorised) {
  //     res.status(401).send("Unauthorized Request");
  //   } else {
  //     next();
  //   }
  // }
);

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.get("/user", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
