const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref:'User',
    index: true,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref:'Category',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('record', recordSchema)