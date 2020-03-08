const express = require('express')
const path = require("path")
const app = express()
const bodyparser = require('body-parser')
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4444
const secret = process.env.SECRET || 'super secret sly stuffs'
const fileUpload = require('express-fileupload');
const multer = require('multer')
const expressJwt = require('express-jwt')





  app.use(express.static(path.join(__dirname, "client", "build")))
  app.use(require("body-parser").text());
  app.use(express.json())
  app.use(morgan('dev'))
  app.use(fileUpload());

  app.use('/api', expressJwt({ secret: process.env.SECRET}))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/store', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,

}, console.log('db is connected...'))

//routes 
app.use('/user', require('./routes/userRouter.js'))
app.use('/api/product', require('./routes/productRouter.js'))
app.use('/products', require('./routes/withoutAuthRouter.js'))
app.use('/contactbuyer', require('./routes/contactRouter'))
app.use('/contactseller', require('./routes/contactSellerRouter'))
app.use('/charge', require('./routes/paymentRouter'))
// may have to create a tokenified route


//error handling

app.use( (err,req,res,next) => {
  console.log(err)
  err.name ? res.status(err.status) : null
  res.send({errMsg: err.message})
})



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`app is live ${PORT}`)
})