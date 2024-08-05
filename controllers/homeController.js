'use strict'

const homeController = {}

// controller for directing the user to the home page
homeController.index = (req, res, next) => {
  res.render('home/index')
}

module.exports = homeController
