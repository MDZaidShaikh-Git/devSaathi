const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the landing page");
});

app.get("/test", (req, res) => {
  res.send("Testing page!");
});

app.get("/hello", (req, res) => {
  res.send("Hello everyone!");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
