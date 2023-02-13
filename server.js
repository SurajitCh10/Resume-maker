const express = require('express')
const app = express()
require("dotenv").config();
const mongoose = require('mongoose')

const URL = process.env.mongo_url

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })

const connection = mongoose.connection

connection.on('connected', () => {
  console.log('Mongo DB Connection Successfull')
})
connection.on('error', (error) => {
  console.log(error)
})


app.use(express.json())
const port = process.env.PORT || 5000
const userRoute = require('./routes/userRoute')
const path = require('path')
app.use('/api/user/', userRoute)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
  })
}

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
