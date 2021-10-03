const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const { registerValidation, loginValidarion } = require('../validations')

router.post('/register', async (req, res) => {

    // validating the data
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // checking if the user is already in the database
    const emailExists = await User.findOne({ email: req.body.email })
    if(emailExists) return res.status(400).send('Email already exists!')

    // hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // creating a new user with hashed password
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })

    try {
        
        const savedUser = await user.save()
        res.status(200).json(savedUser)

    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router
