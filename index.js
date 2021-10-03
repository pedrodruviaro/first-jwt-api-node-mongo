const express = require('express')
const authRoute = require('./routes/auth')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', authRoute)

app.listen(3000, () => console.log('Server running!'))