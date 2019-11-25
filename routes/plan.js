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
    Plan.findById(req.params.id)
        .then(plan => res.render("planDetails", {
            plan
        }))
        .catch(err => console.log(err))
})

router.get("/new-plan", (req, res, next) => {
    res.render("new-plan")
})

router.post("/new-plan", (req, res, next) => {
    //     const { name, description, photo, address, coordinates } = req.body
    //     let owner = req.user.id
    //     Plan.create({ name, description, photo, address, coordinates, owner })
    //         .then(newPlan => console.log(newPlan))
    //         .catch(err => console.log(err))
    // })

    const { name, description, photo, address, coordinates } = req.body
    let owner = req.user.id

    const newPlan = new Plan({
        name, description, photo, address, coordinates, owner
    });
    newPlan.save()
        .then(createdPlan => {
            res.redirect("group/:id")
        }).catch((err) => console.log(err))
})

router.get("/:id/edit", (req, res, next) => {

})

router.post("/:id/edit", (req, res, next) => {

})

router.post("/:id/delete", (req, res, next) => {

})

module.exports = router;