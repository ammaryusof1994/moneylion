const express = require("express");
const router = express.Router();
const User = require("../models/user");

// url to consume API as follows
// localhost:3001/api/feature/ammaryusof1994@gmail.com/changeStatus
router.get("/feature/:email/:featureName", (req, res) => {
  // Find user with given params
  User.findOne({
    email: req.params.email,
    featureName: req.params.featureName,
  })

    //pass canAccess result
    .then((result) => {
      res.json({ canAccess: result.canAccess });
    })
    .catch((err) => {
      res.sendStatus(304);
    });

  // send 400 if user doesn't exist
  res.sendStatus(400);
});

router.post("/feature", (req, res) => {
  let user = new User({
    email: req.body.email,
    featureName: req.body.featureName,
    canAccess: req.body.canAccess,
  });

  // Find email and feature in database
  User.find({ email: user.email, featureName: user.featureName })
    .then((result) => {
      // case: exist
      if (result.length) {
        let data = result[0];

        // if canAccess are not the same
        if (data.canAccess != user.canAccess) {
          // update canAccess to new status
          User.updateOne({ _id: data._id }, { canAccess: user.canAccess })
            .then((result) => res.sendStatus(200))
            .catch((err) => res.sendStatus(304));
        }

        // send 200 status if canAccess are the same
        else {
          res.sendStatus(200);
        }
      }

      // case: doesn't exist
      else {
        // save/create a new object in database
        user
          .save()
          .then((result) => res.sendStatus(200))
          .catch((err) => res.sendStatus(304));
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(304);
    });
});

module.exports = router;
