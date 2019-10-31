const express = require('express')
const paymentRouter = express.Router()
const Product = require('../models/product.js')
const stripe = require('stripe')(process.env.PUBLISHABLE_KEY);



paymentRouter.post("/", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      source: req.body.token
    });

    
    return res.json({status});
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});


module.exports = paymentRouter
