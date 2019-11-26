const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group")
const Plan = require("../models/Plan")
const bodyParser = require("body-parser")
const ensureLogin = require("connect-ensure-login");
const planRouter = require('./plan')

router.get("/new-group", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('newGroup');
});

router.post("/new-group", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  /*Group.create(req.body)
res.redirect ('/auth/profile') */
});


router.get("/:id",
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    Group.findById(req.params.id).populate('plans')
      .then(group => {
        // let totalPlans = group.plans;
        // res.json({
        //   totalPlans
        // })
        res.render('event', {
          group
        })
      });
  });

//ensureLogin.ensureLoggedIn(),

router.post("/:_id", (req, res, next) => {
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
      console.log("A")
      console.log(group)
      console.log("////////////")
      // console.log(group.plans.length)

      if (group !== null && group.plans.length > 0) {
        console.log("A1")
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
        console.log("B1")
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