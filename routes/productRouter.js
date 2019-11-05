const express = require('express')
const productRouter = express.Router()
const Product = require('../models/product.js')


const handleRequest = (err,req,res,next,arg) => err ? res.status(500).next(err) : res.status(200).send(arg)
  const dataBaseChange = (err,req,res,next,arg) => err ? res.status(500).next(err) : res.status(201).send(arg)

//all products
productRouter.get('/', (req,res,next) => {
  Product.find({isIncart: false, isBought: false}, (err,products) => {
    handleRequest(err,req,res,next,products)
  })
})


//your products
productRouter.get('/user/:id', (req,res, next) => {
  Product.find({user: req.user._id}, (err,products) => {
    handleRequest(err,req,res,next,products)
  })
})

//everything forsell
productRouter.get('/forsell', (req,res, next) => {
  Product.find({isIncart: false, isBought: false}, (err,products) => {
    handleRequest(err,req,res,next,products)
  })
})
//products in cart
productRouter.get('/cart', (req,res, next) => {
  Product.find({isIncart: true}, (err,products) => {
    handleRequest(err,req,res,next,products)
  })
})
productRouter.get('/bought', (req,res, next) => {

  Product.find({isBought: true}, (err,products) => {
    handleRequest(err,req,res,next,products)
  })
})


productRouter.put('/bought/:_id', (req,res, next) => {
  Product.findOneAndUpdate({_id: req.params._id, user: req.user._id,},
    req.body, {new: true}, (err,products) => {
      req.body.isBought = true
     
    handleRequest(err,req,res,next,products)
  })
})

//find one
productRouter.get('/:name/:_id', (req,res, next) => {
  Product.findOne({_id: req.params._id}, (err,products) => {
    handleRequest(err,req,res,next,products)
  })
})

//make a new product
productRouter.post('/', (req,res,next) => {
  console.log('hit the post')
  const newProduct = new Product(req.body)
  newProduct.user = req.user._id
  newProduct.save( (err,product) => {
    dataBaseChange(err,req,res,next,product)
  })
})

// get a specific product
//may need to add a user id. 
productRouter.get('/:_id', (req,res,next) => {
  Product.findById({_id: req.params._id}, (err,product) => {
    handleRequest(err,req,res,next,product)
  })
})

//delete a product
productRouter.delete('/:_id', (req,res,next) => {
  Product.findByIdAndDelete({_id: req.params._id, user: req.user._id}, (err,product) => {
    dataBaseChange(err,req,res,next,product)
  })
})

// edit a product
productRouter.put('/:_id', (req,res,next) => {
  Product.findOneAndUpdate({_id: req.params._id, user: req.user._id,},
    req.body, {new: true}, (err,product)=> {
    dataBaseChange(err,req,res,next,product)
  })
})





module.exports = productRouter