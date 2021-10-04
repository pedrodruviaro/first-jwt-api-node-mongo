const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidarion } = require("../validations");

router.post("/register", async (req, res) => {
  // validating the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the user is already in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists!");

  // hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // creating a new user with hashed password
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    const { password, ...rest } = savedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  // validating the data
  const { error } = loginValidarion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the user is already in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doens't exists.");

    // password is correct?
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("Invalid password!")

    // creating and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).send(token)




});

module.exports = router;
