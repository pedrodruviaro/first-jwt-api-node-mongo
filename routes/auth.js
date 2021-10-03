const router = require('express').Router()
const User = require('../model/User')

// VALIDATION
const Joi = require('@hapi/joi')
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})

router.post('/register', async (req, res) => {

    // lets validate the data before we make the user
    const validation = schema.validate(req.body)
    
    res.send(validation)

    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // })

    // try {
        
    //     const savedUser = await user.save()
    //     res.status(200).json(savedUser)

    // } catch (error) {
    //     res.status(400).json(error)
    // }
})

module.exports = router
