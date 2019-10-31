const express = require('express')
const productRouter = express.Router()
const Product = require('../models/product.js')
const stripe = require('stripe')('sk_test_CXMUi3h50oI3L61wpLYfDuxB00lO81ro0B');



(async () => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      images: ['https://example.com/t-shirt.png'],
      amount: 500,
      currency: 'usd',
      quantity: 1,
    }],
    success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com/cancel',
  });
})();

