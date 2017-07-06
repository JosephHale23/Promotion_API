'use strict';

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    id: Number,
    promotion_category: String,
    promotion_type: String,
    promotion_description: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;
