const express = require("express");
const mongoDB = require("./db");
const app = express();
require("dotenv").config();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.port);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.use("/api", require("./Routes/DisplayData"));
app.use(express.json());

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
