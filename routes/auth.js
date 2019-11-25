const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group")
const Plan = require("../models/Plan")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 3;


router.get("/", (req, res, next) => {
  res.render("auth/login", {
    "message": req.flash("error")
  });
});

router.post("/", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/auth/",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const {
    username,
    email,
    password,
    pic
  } = req.body

  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", {
      message: "Indicate email, username and password"
    });
    return;
  }

  // User.findOne({
  //   email
  // }, "email", (err, user) => {
  //   if (email !== null) {
  //     res.render("auth/signup", {
  //       message: "The email already exists"
  //     });
  //     return;
  //   }
  // });

  User.findOne({
    username
  }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        message: "The username already exists"
      });
      return;
    }


    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      pic

    });

    newUser.save()
      .then(() => {
        res.redirect("/profile");
      })
      .catch(err => {
        res.render("auth/signup", {
          message: "Something went wrong"
        });
      })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/profile", (req, res, next) => {
  User.find()
    .then(user =>
      res.render("auth/profile", {
        user
      })
    );
});

// router.post("/profile", (req, res) => {
//   capturate new profile pic
// });

router.get("/profile/new-group", (req, res, next) => {
  res.render("auth/newGroup")
  //sera un formulario para crear plan
});


module.exports = router;