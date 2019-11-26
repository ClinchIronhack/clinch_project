const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group")
const Plan = require("../models/Plan")
const bodyParser = require("body-parser")
const ensureLogin = require("connect-ensure-login");
const planRouter = require('./plan')

router.use('/:id/plan', planRouter);

router.get("/new-group", ensureLogin.ensureLoggedIn("auth/login"), (req, res, next) => {
  res.render('newGroup');
});

router.post("/new-group", ensureLogin.ensureLoggedIn("auth/login"), (req, res, next) => {
  /*Group.create(req.body)
res.redirect ('/auth/profile') */
});


router.get("/:id", ensureLogin.ensureLoggedIn("auth/login"), (req, res, next) => {
  Group.findById(req.params.id).populate('plans')
    .then(group => {
      res.render('event', {
        group
      })
    });
});

router.post("/:_id", ensureLogin.ensureLoggedIn("auth/login"), (req, res, next) => {
  let user = req.user
  let paramsOL = req.params
  let bodyOL = req.body

  Group.findById(paramsOL._id).populate({
    path: 'plans',
    match: {
      votes: {
        $eq: user._id
      }
    }
  })
    .then(group => {
      if (group !== null && group.plans.length > 0) {
        let planId = group.plans[0]._id;
        return Plan.findByIdAndUpdate({
          _id: planId
        }, {
          $pull: {
            votes: user._id
          }
        })
          .then(() => Plan.updateOne({
            _id: bodyOL._id
          }, {
            $push: {
              votes: user._id
            }
          }))
      } else {
        return Plan.updateOne({
          _id: bodyOL._id
        }, {
          $push: {
            votes: user._id
          }
        })
      }
    })
    .then(() =>
      res.redirect(`/group/${req.params._id}`)
    )

});



module.exports = router;