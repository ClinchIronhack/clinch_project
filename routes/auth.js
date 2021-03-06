const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group")
const Plan = require("../models/Plan")
const bodyParser = require("body-parser")
const ensureLogin = require("connect-ensure-login");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 3;


router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    //tiene que redirigir  a perfil
    "message": req.flash("error")
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/profile",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));


router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password;

  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", {
      message: "Indicate email, username and password"
    });
    return;
  }

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
      email,
      password: hashPass
    });

    newUser.save()
      .then(() => {
        res.redirect("/auth/login");
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
  res.redirect("/auth/login");
});

router.get("/profile", ensureLogin.ensureLoggedIn(),(req, res, next) => {
  User.findById(req.user._id).populate('groups')
    .then(user =>
    {let data = user.groups;
      // res.json(data)
      res.render("auth/profile", {
        data, user
      })
    }
    );
});

// router.post("/profile", (req, res) => {
//   capturate new profile pic
// });




module.exports = router;