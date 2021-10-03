const Joi = require("@hapi/joi");

// register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// login validation
const loginValidarion = (data) => {
    const schema = Joi.object({
      name: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
    });
  
    return schema.validate(data);
  };

module.exports = {
    registerValidation,
    loginValidarion
};
