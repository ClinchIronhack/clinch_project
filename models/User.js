const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  pic: { type: String, default: '../public/images/avatar.png' },
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  plan: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
  password: String
})

const User = mongoose.model('User', userSchema);
module.exports = User;
