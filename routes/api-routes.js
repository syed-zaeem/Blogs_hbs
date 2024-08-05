'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

// route for deleting the blogs
router.post('/deleteBlog', auth.blogJson, require('../controllers/blogController').deleteJson)
// route for updating the blog
router.post('/updateBlog', auth.blogJson, require('../controllers/blogController').updateJson)

module.exports = router
