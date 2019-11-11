const express = require('express')
const paymentRouter = express.Router()
const Product = require('../models/product.js')
const stripe = require('stripe')(process.env.REACT_APP_SECRET_LIVE_APIKEY || process.env.REACT_APP_SECRET_TEST_APIKEY);



paymentRouter.post("/", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      source: req.body.token,
    });
    return res.json({status});
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});


module.exports = paymentRouter
