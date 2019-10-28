const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET


  



const handleRequest = (err,req,res,next,arg) => err ? res.status(500).next(err) : res.status(200).send(arg)
const dataBaseChange = (err,req,res,next,arg) => err ? res.status(500).next(err) : res.status(201).send(arg)

userRouter.get('/', ( req,res,next) => {
  User.find( (err,user) => {
    handleRequest(err,req,res,next,user)
  })
})
userRouter.get('/:_id', ( req,res,next) => {
  User.findById({_id: req.params._id }, (err,user) => {
    handleRequest(err,req,res,next,user)
  })
})

userRouter.get('/admin', (req,res,next) => {
  User.find({isAdmin: true}, (err,users) => {
    handleRequest(err,req,res,next,users)
  })
})
userRouter.get('/normal', (req,res,next) => {
  User.find({isAdmin: false}, (err,users) => {
    handleRequest(err,req,res,next,users)
  })
})
userRouter.delete('/:_id', (req,res,next) => {
  User.findOneAndDelete({_id: req.params._id}, (err,user) => {
    dataBaseChange(err,req,res,next,user)
  })
})


userRouter.post('/signup', (req,res,next) => {
  User.findOne({name: req.body.name}, (err,existingUser) => {
    if(err) {  res.status(400)
    return next(err)
  }
      if(existingUser !== null) {
        res.status(400)
        return next(new Error("user already exists"))
      }
        const newUser = new User(req.body)
        newUser.save( (err,user) => {
          if(err) {res.status(500).next(err)}
          const token = jwt.sign(user.withoutpassword(), secret)
          return res.status(201).send({success: true, user: user.withoutpassword(), token})
    })
  })
})

userRouter.post('/login', (req,res,next) => {
  User.findOne({name: req.body.name.toLowerCase()}, (err, user) => {
    if(err) {return next(err)}
    if(!user) {
      res.status(403)
      return next( new Error('a piece of the information that you entered is incorrect check your name,email and password and try again.'))
    }
    user.checkpassword(req.body.password, (err,match) => {
      if(err) {return res.status(500).send(err)}
      
      if(!match) {return res.status(401).send(new Error('email or password are incorrect'))}
      
      
      const token = jwt.sign(user.withoutpassword(), secret)
      return res.send({token: token, user: user.withoutpassword(), success: true})
    })
  })
})


module.exports = userRouter