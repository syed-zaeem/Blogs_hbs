'use strict'

const mongoose = require('mongoose')
const User = require('./User')

// schema for the blogs
const blogSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: String, required: true },
  private: { type: Boolean, default: true }
}, { versionKey: false })

blogSchema.statics.byAuthorName = async function (name) {
  const user = await User.findOne({ username: name })
  const userId = user._id
  const blogs = await this.find({ author: userId, private: false })
  return blogs
}

const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog
