const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//   res.send("Welcome to the landing page");
// });

// app.get("/test", (req, res) => {
//   res.send("Testing page!");
// });

// app.get("/hello", (req, res) => {
//   res.send("Hello everyone!");
// });

app.get("/user", (req, res) => {
  res.send({ firstName: "Zaid", lastName: "Shaikh" });
});

app.post("/user", (req, res) => {
  console.log("Save data to the database");
  res.send("Data successfully saved to the database");
});

app.delete("/user", (req, res) => {
  res.send("Deleted Successfully!");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000...");
});
