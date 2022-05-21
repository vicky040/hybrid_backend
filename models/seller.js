const mongoose = require('mongoose');

const MySeller = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    catalog: { type: mongoose.Schema.Types.ObjectId, ref: 'items' },
    orders: { type: mongoose.Schema.Types.ObjectId, ref: 'items' },
});

const Seller = mongoose.model('sellers', MySeller);
module.exports = Seller;
