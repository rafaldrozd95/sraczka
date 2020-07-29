const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
require("dotenv").config();
const HttpError = require("./controllers/httpError");

app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
const tyreRouter = require("./routes/tyreRouter");
const userRouter = require("./routes/authRouter");
app.use("/api/tyres", tyreRouter);
app.use("/api/users", userRouter);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});
app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured" });
});
const DB = process.env.MONGO_URI;
const port = process.env.PORT || 8000;
mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  () => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
);
