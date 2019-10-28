const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  }
})


module.exports = mongoose.model("Product", productSchema)