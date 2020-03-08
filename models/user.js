const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
    default: 'https://firebasestorage.googleapis.com/v0/b/the-stor-e.appspot.com/o/images%2Fdownload.png?alt=media&token=9a6c5aba-42a1-43a0-bd6d-f0462b6bdb84',
  }
})


userSchema.pre('save', function(next) {
  const user = this
  if(!user.isModified('password')) return next()
  bcrypt.hash(user.password, 11, (err, hash) => {
    if(err) return next(err)
    user.password = hash;
    next()
  })
})

userSchema.methods.checkpassword = function(passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if(err) return callback(err)
    callback(null,isMatch)
  })
}

userSchema.methods.withoutpassword = function(next) {
  const user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model("User", userSchema)

//make the salt number between a range. 