const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = 4444
const expressJwt = require('express-jwt')


app.use(express.json())
app.use(morgan('dev'))


app.use('/api', expressJwt({ secret: process.env.SECRET}))

mongoose.connect('mongodb://localhost:27017/store', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,

}, console.log('db is connected...'))

//routes 
app.use('/user', require('./routes/userRouter.js'))
app.use('/api/product', require('./routes/productRouter.js'))



//error handling

app.use( (err,req,res,next) => {
  console.log(err)
  err.name ? res.status(err.status) : null
  res.send({errMsg: err.message})
})




app.listen(PORT, () => {
  console.log(`app is live ${PORT}`)
})