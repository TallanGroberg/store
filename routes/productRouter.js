const express = require('express')
const productRouter = express.Router()
const Product = require('../models/product.js')

const handleRequest = (err,req,res,next,arg) => err ? res.status(500).next(err) : res.status(200).send(arg)
const dataBaseChange = (err,req,res,next,arg) => err ? res.status(500).next(err) : res.status(201).send(arg)

productRouter.get('/', (req,res, next) => {
  Product.find( (err,products) => {
    handleRequest(err,req,res,next,products)
  })
})

productRouter.post('/', (req,res,next) => {
  const newProduct = new Product(req.body)
  newProduct.save( (err,product) => {
    dataBaseChange(err,req,res,next,product)
  })
})

productRouter.get('/:_id', (req,res,next) => {
  Product.findById({_id: req.params._id}, (err,product) => {
    handleRequest(err,req,res,next,product)
  })
})

productRouter.delete('/:_id', (req,res,next) => {
  Product.findByIdAndDelete({_id: req.params._id}, (err,product) => {
    dataBaseChange(err,req,res,next,product)
  })
})

productRouter.put('/:_id', (req,res,next) => {
  Product.findByIdAndUpdate({_id: req.params._id},
     req.body, {new: true}, (err,product)=> {
    dataBaseChange(err,req,res,next,product)
  })
})


module.exports = productRouter