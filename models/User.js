const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  pic: { type: String, default: 'https://res.cloudinary.com/flor-i-ronhack/image/upload/v1574875140/clinch/avatar.png' },
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  plan: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
  password: String,
  // timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;
