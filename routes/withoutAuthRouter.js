const express = require('express')
const withoutAuthRouter = express.Router()
const Product = require('../models/product.js')



const handleRequest = (err,req,res,next,arg) => err ? res.status(500).next(err) : res.status(200).send(arg)
const dataBaseChange = (err,req,res,next,arg) => err ? res.status(500).next(err) : res.status(201).send(arg)


withoutAuthRouter.get('/search', (req,res,next) => {
   
  const { title } = req.query
  const pattern = new RegExp(title.split(' ').join('/ ')) 
  Product.find({title: {$regex: pattern, $options: 'i'}}, (err, product) => {
    if(err){
        res.status(500)
        return next(err)
    }
    return res.status(200).send(product)
})
})

withoutAuthRouter.get('/', (req,res,next) => {
  Product.find({isIncart: false, isBought: false}, (err,products) => {
    handleRequest(err,req,res,next,products)
  })
})

withoutAuthRouter.get('/:name/:_id', (req,res, next) => {
  Product.findOne({_id: req.params._id}, (err,products) => {
    handleRequest(err,req,res,next,products)
  })
})

module.exports = withoutAuthRouter