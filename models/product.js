const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buyer: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imgUrl: {
    type: String,
    default: 'https://firebasestorage.googleapis.com/v0/b/the-stor-e.appspot.com/o/images%2Fdownload.png?alt=media&token=9a6c5aba-42a1-43a0-bd6d-f0462b6bdb84' 
    
  },
  price: {
    type: Number,
    required: true,
  },
  isIncart: {
    type: Boolean,
    default: false
  },
  isBought: {
    type: Boolean,
    default: false
  }
})


module.exports = mongoose.model("Product", productSchema)