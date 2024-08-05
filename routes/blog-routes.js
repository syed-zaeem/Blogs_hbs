'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/blogController')
const auth = require('../middlewares/auth')

// route for creating the new post or new blog
router.route('/create')
  .get(controller.create)
  .post(controller.createPost)

// route for getting the all blogs of one user
router.get('/author/:id', auth.user, controller.yourBlogs)

// route for detailed view of one blog
router.get('/:id', controller.viewBlog)

// route for blogs by author
router.get('/by/:name', controller.allByAuthor)

// route for getting all blogs from all users
router.get('/', controller.list)

module.exports = router
