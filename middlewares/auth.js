'use strict'

const Blog = require('../models/Blog')
const Session = require('../models/Session')
const path = require('path')

const auth = {}

// middleware for authentication
auth.user = async (req, res, next) => {
  try {
    if (!await validSession(req.session)) {
      throw new Error()
    }
    const pageID = req.params.id
    const user = req.session.user

    if (pageID !== user._id) {
      throw new Error()
    }
    next()
  } catch {
    send404(res)
  }
}

// middleware for user specific blogs
auth.blogJson = async (req, res, next) => {
  try {
    if (!await validSession(req.session)) {
      throw new Error()
    }
    const userID = req.session.user._id
    const blog = await Blog.findById(req.body.id).populate('author')
    const authorID = String(blog.author._id)
    if (authorID !== userID) {
      throw new Error('Not matching ids')
    }
    next()
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

// middleware for session validation
async function validSession (session) {
  const match = await Session.findOne({ id: session.id })
  if (match) {
    if (match.user._id === session.user._id) {
      console.log('Valid session')
      return true
    }
  }
  return false
}

function send404 (res) {
  res.status(404)
  res.sendFile(path.join(__dirname, '../public', '404.html'))
}

module.exports = auth
