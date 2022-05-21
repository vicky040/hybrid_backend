const mongoose = require('mongoose');

const MyItem = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
});

const Item = mongoose.model('items', MyItem);
module.exports = Item;
