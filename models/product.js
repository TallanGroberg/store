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