require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const connection = mongoose.connection

connection.on('connected', () => {
  console.log('mongoDB connected')
})

connection.on('error', (error) => {
  console.log(error)
})
