const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoURI = '';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
        console.log('Database connected');
    }).catch(err => console.error(err));


// Models
const Item = require('./models/item');
const Buyer = require('./models/buyer');
const Seller = require('./models/seller');


app.post('/register/seller', function (req, res) {
    Seller.findOne({ username: req.body.username }, (err, seller) => {
        if (err) {
            return res.json({ success: false, msg: 'some error occured' });
        } else if (seller) {
            return res.json({ success: false, msg: 'Username already exist' });
        } else {
            new Seller({
                username: req.body.username,
                password: req.body.password,
            }).save((err) => {
                if (err) {
                    return res.json({ success: false, err: 'Registration failed' });
                }
                return res.json({ success: true, msg: 'Registration successful' });
            });
        }
    });
});

app.post('/register/buyer', function (req, res) {

    Buyer.findOne({ username: req.body.username }, (err, buyer) => {
        if (err) {
            return res.json({ success: false, msg: 'some error occured' });
        } else if (buyer) {
            return res.json({ success: false, msg: 'Username already exist' });
        } else {
            new Buyer({
                username: req.body.username,
                password: req.body.password,
            }).save((err) => {
                if (err) {
                    return res.json({ success: false, err: 'Registration failed' });
                }
                return res.json({ success: true, msg: 'Registration successful' });
            });
        }
    });

});

app.post('/login/seller', function (req, res) {

    Seller.findOne({ username: req.body.username }, (err, seller) => {
        if (err) {
            return res.json({ success: false, err: err });
        } else if (!seller) {
            return res.json({ success: false, msg: 'User not registered' });
        } else {
            if (seller.password != req.body.password) {
                return res.json({ success: false, err: 'Incorrect password' });
            }
            return res.json({ success: true, seller: seller });
        }
    });

});

app.post('/login/buyer', function (req, res) {

    Buyer.findOne({ username: req.body.username }, (err, buyer) => {
        if (err) {
            return res.json({ success: false, err: err });
        } else if (!buyer) {
            return res.json({ success: false, msg: 'User not registered' });
        } else {
            if (buyer.password != req.body.password) {
                return res.json({ success: false, err: 'Incorrect password' });
            }
            return res.json({ success: true, buyer: buyer });
        }
    });

});


app.get('/buyer/list-of-sellers', function (req, res) {

    Seller.find({}, (err, sellers) => {
        if (err) {
            return res.json({ success: false, err: err });
        } else {
            return res.json({ success: true, sellers: sellers });
        }
    });

});


app.get('/buyer/seller-catalog/:seller_id', function (req, res) {

    Seller.findOne({ id: seller_id }, (err, seller) => {
        if (err) {
            return res.json({ success: false, err: err });
        } else if (!seller) {
            return res.json({ success: false, msg: 'User not registered' });
        } else {
            return res.json({ success: true, catalog: seller.catalog });
        }
    });
});


app.post('/seller/create-catalog/:sellerId', function (req, res) {

    const newItem = new Item({
        name: req.body.name,
        price: req.body.price
    });

    newItem.save((err) => {
        if (err) {
            return res.json({ success: false, err: 'Error' });
        }
        else {
            Seller.findOneAndUpdate({ id: req.params.sellerId }, { "$push": { "catalog": newItem } }, (err, seller) => {
                if (err) {
                    return res.json({ success: false, err: err });
                } else {
                    return res.json({ success: true, msg: 'Catalog updated' });
                }
            });
        }
    });



});

//_______________________________________________



const port = 5000;
app.listen(port, function () {
    console.log("Server up on port " + port);
});