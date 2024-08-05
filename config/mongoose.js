'use strict'
const mongoose = require('mongoose')

// Set the connection string for MongoDB connection
// const CONNECTION_STRING = 'mongodb+srv://assignment2:Sd9Kt1HztpTqGMOd@cluster0-r97aa.azure.mongodb.net/1dv523ass2'
// const CONNECTION_STRING = 'mongodb://localhost:27017'
const CONNECTION_STRING = 'mongodb+srv://zaeem:12345@cluster0.lbtgmla.mongodb.net/Blogs'

exports.connect = async () => {
  // Bind connection to events (to get notifications).
  mongoose.connection.on('connected', () => console.log('Mongoose connection is open.'))
  mongoose.connection.on('error', err => console.error(`Mongoose connection error has occurred: ${err}`))
  mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'))

  // If the Node process ends, close the Mongoose connection.
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection is disconnected due to application termination.')
      process.exit(0)
    })
  })

  // return mongoose.connect(CONNECTION_STRING, { useMongoClient: true })
  return mongoose.connect(CONNECTION_STRING)
}

