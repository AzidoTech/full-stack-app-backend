const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./config/db");

const userController = require("./controllers/users.controller");

const userRouter = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));

dbConnection.dbConnect();

app.get("/users", (req, res) => {
  res.send("Welcome to e-commerce.");
});

app.use("/", userRouter);

app.listen(8080, () => {
  console.log("everything ran succesfully.");
});
