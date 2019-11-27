const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    name: String,
    description: String,
    address: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    location: { type: { type: String }, coordinates: [Number] },
    group: { type: Schema.Types.ObjectId, ref: 'Group' },
    votes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
planSchema.index({ location: '2dsphere' });

const Plan = mongoose.model('Plan', planSchema);
module.exports = Plan;

