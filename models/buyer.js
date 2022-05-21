const mongoose = require('mongoose');

const MyBuyer = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const Buyer = mongoose.model('buyers', MyBuyer);
module.exports = Buyer;
