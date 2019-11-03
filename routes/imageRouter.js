const express = require('express')
const imageRouter = express.Router()
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: 'the-stor-e', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});






module.exports = imageRouter