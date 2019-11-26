const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group")
const Plan = require("../models/Plan")
const bodyParser = require("body-parser")
const ensureLogin = require("connect-ensure-login");

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

router.post("/:id", (req, res, next) => {
  let user = req.user
  let paramsOL = req.params
  let bodyOL = req.body

  Group.findById(paramsOL.id).populate({
      path: 'plans',
      match: {
        votes: {
          $eq: user._id
        }
      }
    })
    .then(group => {
      if (group.plans.length > 0) {
        let planId = group.plans[0]._id;
        console.log(planId)
        // if(planId) {
        //   console.log(true)
        return Plan.findByIdAndUpdate({
          _id: planId
        }, {
          $pull: {
            votes: req.user._id
          }
        }).then(() => Plan.updateOne({
          _id: bodyOL._id
        }, {
          $push: {
            votes: user._id
          }
        }).then(newPlan => {
          console.log(newPlan)
        }))
      } else {

        return Plan.updateOne({
          _id: bodyOL._id
        }, {
          $push: {
            votes: user._id
          }
        }).then(newPlan => {
          console.log(newPlan)
        })
      }

    })
    .then( ()=>
    res.redirect(`/group/${req.params.id}`)
    )
    // .then(group => {

    //   group.plans
    //   .forEach(element => {
    //     console.log(element.votes.filter(filtered => filtered ===req.user._id))
    //   });



    //   Plan.findOne([
    //     {
    //        $project: {
    //           votes: {
    //              $filter: {
    //                 input: "$votes",
    //                 as: "vote",
    //                 cond: { $eq: [ "$item", user ] }
    //              }
    //           }
    //        }
    //     }
    //  ])
    // group.plans.find({ votes: user._id})
    //   .then(group => res.json({
    //     group
    //   }))


    // .then(() =>
    //   Group.findById(paramsOL.id).populate('plans'))
    // .then(group => {
    //   // res.render('event', {
    //   group
    // })
  // })
  // .catch(error => {
  //   next();
  //   console.log(error)

  // });
  // });

});



module.exports = router;