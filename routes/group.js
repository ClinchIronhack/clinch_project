require('dotenv').config();
const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group")
const Plan = require("../models/Plan")
const bodyParser = require("body-parser")
const ensureLogin = require("connect-ensure-login");
// const planRouter = require('./plan')

// router.use('/:id/plan', planRouter);

router.get("/new", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let owner = req.user
  User.find()
    .then((users) => {
      // res.json({users, owner})
      res.render('createEvent', {
        users,
        owner
      })
    });
});

router.post("/new", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let body = req.body
  // res.json(body)
  Group.create(req.body)
    .then((group) => {
      body.users.forEach(user => {
        return User.findByIdAndUpdate({
          _id: user
        }, {
          $push: {
            groups: group._id
          }
        }).then(groupAdd => console.log(groupAdd))

      })
    })
    .then(() => res.redirect('/auth/profile'))

});

router.get("/:id", (req, res, next) => {
  Group.findById(req.params.id).populate('plans')
    .then((group) => {
      // res.json(group)
      group.plans.sort((a, b) => {
        return (b.votes.length) - (a.votes.length);
      })
      // res.json({
      //   group
      // })
      res.render('event', {
        group
      })
    })
    .catch(error => {
      console.log(error);
    });
})

//esto esta roto
router.post("/:id", (req, res, next) => {
  let user = req.user
  let groupId = req.params.id
  let bodyOL = req.body

  Group.findById(groupId).populate({
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
      res.redirect(`/group/${req.params.id}`)
    )
    .catch(error => {
      console.log(error);
    })
});



module.exports = router;