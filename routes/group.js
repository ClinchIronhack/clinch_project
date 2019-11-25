const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group")
const Plan = require("../models/Plan")
const bodyParser = require("body-parser")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 3;

router.get("/:id", (req, res, next) => {
  console.log(req.params._id)
  /* <h> nombre
<a>plan * plans.length =>/plan/:idPlan
+ <button>vote .sort(plan.votes.length)&&highlight 1º =>/groupDetails/POST
map
<button> create plan => /newPlan */
});

router.post("/:id", (req, res, next) => {
  /*agregar userID al array de plan.votes
=> groupDetails/GET */
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

