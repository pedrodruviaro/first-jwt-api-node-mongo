const router = require("express").Router();
const verifyToken = require('../verifyToken')

router.get('/', verifyToken ,(req, res) => {

    // res.json({ posts: [{ title: "one"}, {title: "two"}]})
    res.send(req.user)
})


module.exports = router