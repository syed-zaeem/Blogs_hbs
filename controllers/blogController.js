'use strict'

const Blog = require('../models/Blog')
const moment = require('moment')

const blogController = {}

// controller for list the blogs
blogController.list = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ private: false }).populate('author', 'username').sort({ _id: -1 })

    res.render('blog/index', { blogs: blogs })
  } catch (error) {
    console.log(error)
    req.session.flash = { type: 'danger', text: 'Error loading blogs.' }
    res.redirect('../../')
  }
}

// controller for getting the blogs by author
blogController.allByAuthor = async (req, res, next) => {
  try {
    const blogs = await Blog.byAuthorName(req.params.name)
    blogs.forEach(blog => {
      blog.byAuthor = true
    })
    res.render('blog/index', { blogs: blogs, byAuthor: req.params.name })
  } catch (error) {
    req.session.flash = { type: 'danger', text: 'Error loading blogs.' }
    res.redirect('../../')
  }
}

// controller for getting your own blogs
blogController.yourBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ author: req.params.id }).sort({ _id: -1 })
    res.render('blog/your', { blogs: blogs })
  } catch (error) {
    req.session.flash = { type: 'danger', text: 'Error loading blogs.' }
    res.redirect('../../')
  }
}

// controller for detailed view of one blog
blogController.viewBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author')
    var isAuthor = false
    if (req.session.user) {
      isAuthor = String(blog.author._id) === req.session.user._id
    }
    res.render('blog/blog', { blog: blog, author: isAuthor })
  } catch (error) {
    req.session.flash = { type: 'danger', text: 'Error loading blog.' }
    res.redirect('../')
  }
}

// controller for creating new blog
blogController.create = async (req, res, next) => {
  if (!req.session.loggedin) {
    req.session.flash = { type: 'danger', text: 'You need to be logged in before creating a blog!' }
    req.session.context = { previous: 'create' }
    res.redirect('../../login')
  } else {
    res.render('blog/create')
  }
}

// controller for creating blog and session
blogController.createPost = async (req, res, next) => {
  try {
    const newBlog = new Blog({
      author: req.session.user._id,
      title: req.body.title,
      content: req.body.content,
      private: req.body.private === 'on',
      createdAt: moment().format('MMM D YYYY HH:mm:ss')
    })

    await newBlog.save()

    req.session.flash = { type: 'success', text: 'Blog successfully created.' }
    res.redirect('./create')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('./create')
  }
}

// controller for updating the blog
blogController.updateJson = async (req, res, next) => {
  try {
    await Blog.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      content: req.body.content,
      private: req.body.private
    })
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(400)
  }
}

// controller for deleting the blog
blogController.deleteJson = async (req, res, next) => {
  try {
    await Blog.remove({ _id: req.body.id })
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

blogController.deletePost = async (req, res, next) => {

}

module.exports = blogController
