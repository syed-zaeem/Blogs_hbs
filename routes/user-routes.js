'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/userController')
const auth = require('../middlewares/auth')

// routes for registration of user
router.get('/register', controller.register)
router.post('/register', controller.registerPost)

// route for updating the user details
router.post('/update/:id', auth.user, controller.updatePost)

// route for delete the user
router.post('/delete/:id', auth.user, controller.deletePost)

// route for getting the user details for profile
router.get('/profile/:id', auth.user, controller.profile)

module.exports = router
