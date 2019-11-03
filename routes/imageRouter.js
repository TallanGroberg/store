const express = require('express')
const imageRouter = express.Router()
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: 'the-stor-e', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



// imageRouter.post('/', cloudinary.uploader.upload("my_image.jpg",  (error, result) =>  console.log(result, error));


module.exports = imageRouter