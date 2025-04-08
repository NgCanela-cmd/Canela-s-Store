require('dotenv').config
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const routes = require('../routes/routes')

const app = express()
const PORT = 3000 || 4000

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/PgWeb')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('MongoDB connection established')
})

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use((req, res, next) => {
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

//engine
app.set('view engine', 'ejs')
app.use('', routes)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
