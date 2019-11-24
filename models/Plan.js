const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    name: String,
    description: String,
    photo: String,
    address: String,
    location: { type: { type: String }, coordinates: [Number] },
    group: { type: Schema.Types.ObjectId, ref: 'Group' },
    votes: Number
});
planSchema.index({ location: '2dsphere' });

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;