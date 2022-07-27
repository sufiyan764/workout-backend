require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

const portNumber = process.env.PORTNUMBER;

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose

  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    console.log(process.env.MONGO_URI)
    app.listen(portNumber, () => {
      console.log("connected to db & listening on port -> ", portNumber);
    });
  })
  .catch((err) => {
    console.log(err);
  });
