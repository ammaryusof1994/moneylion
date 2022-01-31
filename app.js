require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");

const feature = require("./routes/feature");

app.use(express.json());

// set route level middleware to app level middleware
app.use("/api", router);

// connect mongodb
// please provide mongodb address in .env file as such DB=mongodbAddress
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("db connected");

    // app listens in port 3001 once db is connected and ready
    app.listen(3001, () => {
      console.log("app is listening...");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// set feature api route
router.use(feature);
