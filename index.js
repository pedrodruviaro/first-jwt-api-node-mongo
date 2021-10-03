const express = require('express')
const authRoute = require('./routes/auth')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// connecting to mongoDB
mongoose.connect(process.env.MONGO_URI, () => console.log("connected to mongodb"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', authRoute)


app.listen(3000, () => console.log('Server running!'))