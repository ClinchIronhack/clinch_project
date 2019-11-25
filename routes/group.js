const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group")
const Plan = require("../models/Plan")
const bodyParser = require("body-parser")
const ensureLogin = require("connect-ensure-login");
const planRouter = require('./plan')

router.use('/:id/plan', planRouter)

router.get("/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Group.findById(req.params.id).populate('plans')
    .then(group =>
      // res.json({ group }))
      // + <button>vote .sort(plan.votes.length)&&highlight 1º 
      res.render('event', { group }))
});

router.post("/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let user = req.user
  let paramsOL = req.params
  let bodyOL = req.body
  Plan.updateOne({ _id: bodyOL._id }, { $push: { votes: user._id } })

    // .then(() => {
    //   res.render("event",{ group });
    // })
    .catch(error => {
      next();
      console.log(error)
    });

});

router.get("/new-group", (req, res, next) => {
  /*<form>Group
nombre
fecha evento
fecha limite grupo
<button> grupo => /createGroup/POST */
});

router.post("/new-group", (req, res, next) => {
  /*Group.create()
redirect => auth/profile/GET */
});


module.exports = router;