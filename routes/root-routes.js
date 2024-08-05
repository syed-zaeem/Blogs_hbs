'use strict'

const express = require('express')
const router = express.Router()

// root route for all the controllers
router.get('/', require('../controllers/homeController').index)

// route for the login or authentication
const loginController = require('../controllers/loginController')
router.route('/login/')
  .get(loginController.login)
  .post(loginController.loginPost)
router.get('/logout', loginController.logout)

module.exports = router
