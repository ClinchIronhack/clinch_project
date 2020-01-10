require('dotenv').config();
const express = require("express");
const passport = require('passport');
const router = express.Router({
    mergeParams: true
});
const Plan = require("../models/Plan")
const User = require("../models/User")
const Group = require("../models/Group")
const bodyParser = require("body-parser")
const ensureLogin = require("connect-ensure-login");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 3;

router.get("/new-plan", (req, res, next) => {
    let groupId = req.params.groupId
    res.render("new-plan", {
        groupId
    })
})

router.post("/new-plan", (req, res, next) => {
    //console.log(req.body)
    const name = req.body.name;
    const description = req.body.description;
    const address = req.body.address;
    const owner = req.user ? req.user._id : null
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const group = req.params.groupId

    const location = {
        type: "Point",
        coordinates: [latitude, longitude]
    }

    console.log(location)

    console.log('Name:' + name)
    console.log('description:' + description)
    console.log('address:' + address)
    console.log('owner:' + name)

    const newPlan = new Plan({
        name,
        description,
        address,
        location,
        owner,
        group
    });

    newPlan.save()
        .then(createdPlan => {
            Group.findById(group).then((group) => {
                let groupPlans = group.plans
                groupPlans.push(createdPlan._id)
                return Group.update({ _id: group._id }, { plans: groupPlans })
            }).then(() => res.redirect(`/group/${req.params.groupId}`))
        })
        .catch((err) => console.log(err))
})


router.get("/:planId", (req, res, next) => {
    let planId = req.params.planId
    Plan.findById(planId)
        .then(plan => {
            plan.location0 = JSON.stringify(plan.location.coordinates[0])
            plan.location1 = JSON.stringify(plan.location.coordinates[1])
            plan.numVotes = plan.votes.length
            res.render("planDetails", {
                plan
            })
        })
        .catch(err => console.log(err))
})


router.get("/:planId/edit", (req, res, next) => {
    let groupId = req.params.groupId
    let planId = req.params.planId

    Plan.findById(planId)
        .then(plan => {
            plan.location0 = JSON.stringify(plan.location.coordinates[0])
            plan.location1 = JSON.stringify(plan.location.coordinates[1])
            res.render("edit-plan", {
                groupId,
                plan
            })
        })
        .catch(err => console.log(err))
})

router.post("/:planId/edit", (req, res, next) => {
    const {
        name,
        description,
        address,
        latitude,
        longitude
    } = req.body
    Plan.findByIdAndUpdate(req.params.planId, {
        name,
        description,
        address,
        location: {
            type: "Point",
            coordinates: [latitude, longitude]
        }
    })
        .then(() =>
            res.redirect(`/group/${req.params.groupId}`)
        )
        .catch(err => console.log(err))
})


router.get("/:planId/delete", (req, res, next) => {
    let planId = req.params.planId
    let groupId = req.params.groupId
    console.log(groupId)
    Plan.findByIdAndDelete(planId)
        .then(() => res.redirect(`/group/${groupId}`))
        .catch(err => console.log(err))
})


module.exports = router;