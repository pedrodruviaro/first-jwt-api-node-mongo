const router = require('express').Router()
const User = require('../model/User')

router.post('/register', async (req, res) => {
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    try {
        
        const savedUser = await user.save()
        res.status(200).json(savedUser)

    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router