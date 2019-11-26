const express = require("express");
const passport = require('passport');
const router = express.Router({ mergeParams: true });
const Plan = require("../models/Plan")
const bodyParser = require("body-parser")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 3;

router.get("/new-plan", (req, res, next) => {
    let groupId = req.params.id
    res.render("new-plan", { groupId })
})

router.post("/new-plan", (req, res, next) => {
    //console.log(req.body)
    const name = req.body.name;
    const description = req.body.description;
    const address = req.body.address;
    const owner = req.user ? req.user._id : null
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const group = req.params.id

    const location = {
        type: "Point",
        coordinates: [40.23, -3.24]
        //     [req.body.latitude, req.body.longitude]
    }

    console.log('Name:' + name)
    console.log('description:' + description)
    console.log('address:' + address)
    console.log('owner:' + name)
    //const photo = req.body.photo;

    // if (name === "" || description === "" || address === "" || location === "") {
    //     res.render("new-plan", {
    //         message: "Please, complete all the fields"
    //     });
    //     return;
    // }

    // if (!req.photo) {
    //     res.render("new-plan", {
    //         message: "Please, upload a photo"
    //     });
    //     return;
    // }

    // if (latitude === "" || longitude === "") {
    //     res.render("new-plan", {
    //         message: "Please, specify a valid address"
    //     });
    //     return;
    // }

    const newPlan = new Plan({
        name, description, address, location, owner
    });

    console.log(newPlan)
    newPlan.save()
        .then(createdPlan => {
            console.log(createdPlan)
            res.redirect(`/group/${req.params.id}`)
        }).catch((err) => console.log(err))
})


router.get("/:id", (req, res, next) => {

    Plan.findById(req.params.id)
        .then(plan => {
            console.log(plan)
            res.render("planDetails", {
                plan
            })
        })
        .catch(err => console.log(err))
})


router.get("/:planId/edit", (req, res, next) => {
    let groupId = req.params.id
    let planId = req.params.planId
    console.log(groupId)
    console.log(planId)
    Plan.findById(planId)
        .then(plan => {
            // console.log(plan)
            res.render("edit-plan", {
                groupId,
                plan
            })
        })
        .catch(err => console.log(err))
})

router.post("/:planId/edit", (req, res, next) => {
    const { name, description, address } = req.body
    const owner = req.user.id
    Plan.findByIdAndUpdate(req.params.planId, { name, description, address, owner })
        .then(() => res.redirect(`/group/${req.params.id}`))
        .catch(err => console.log(err))
})


// router.post("/:planId/delete", (req, res, next) => {
//     let planId = req.params.planId
//     const owner = req.user.id
//     const { name, description, address } = req.body
//     Plan.findByIdAndDelete(req.params.planId, { name, description, address, owner })
//         .then(() => res.redirect(`/group/${req.params.id}`))
//         .catch(err => console.log(err))
// })

// router.post("/:planId/delete", (req, res, next) => {
//     let planId = req.params.planId
//     let groupId = req.params.id
//     Plan.findByIdAndDelete(planId)
//         .then(() => res.redirect(`/group/${req.params.id}`))
//         .catch(err => console.log(err))
// })
module.exports = router;