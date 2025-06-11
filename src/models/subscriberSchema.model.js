const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema({
    email: {type: String, require: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    subscribedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Subscribers', subscriberSchema)