// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Group = require('../models/Group')
const Plan = require('../models/Plan')

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/clinch', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const groups = [
  {
    name: 'Cumple Lola',
    users: [],
    plans: []
  }

]

const plans = [{
  name: "Ojalá",
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
  photo: "https://maps.google.com/maps/contrib/117213119383536068952/photos",
  address: 'Calle de San Andrés, 1, 28004 Madrid, España',
  location: { type: "Point", coordinates: [40.4255326, -3.703956] },
  group: null,
  votes: 0
},

{
  name: "Minabo",
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
  photo: "http://4.bp.blogspot.com/_vp4XfKhN3Ns/S8Xk7n1-H6I/AAAAAAAAFbc/7yfJhTQ5TvY/s320/minabo.jpg",
  address: 'Calle de Caracas, 8, 28010 Madrid, España',
  location: { type: "Point", coordinates: [40.43063, -3.694529] },
  group: null,
  votes: 0
}]


let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    email: "alice@gmail.com",
    pic: String,
    groups: []
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    email: "bob@gmail.com",
    pic: String,
    groups: []
  }
]

Group.deleteMany().then(() => {
  return Group.create(groups)
}).then(groups => {
  plans.forEach(p => p.group = groups[0]._id)
  users.forEach(u => u.groups.push(groups[0]._id))
}).then(() => {
  return Plan.deleteMany()
}).then(() => {
  return Plan.create(plans)
}).then(() => {
  return User.deleteMany()
}).then(() => {
  return User.create(users)
}).then(() => mongoose.disconnect())
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

