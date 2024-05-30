/*
 ----------------------------------------------------------------------------------------
 Validate and/or register new user by name, email and password.
 Assigning token to request headers.
 ----------------------------------------------------------------------------------------
 Here's the logic to validate the login and register input against DB and token 
 assignment to request headers.
*/

const Joi = require("joi");
const jwt = require("jsonwebtoken");

//registration validation
const regValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(data);
};

//login validation
const logValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().max(255).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(data);
};

//token validation
const jwtValidation = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token)
    return res
      .status(401)
      .json({
        error: "Access Denied! Unauthorized access in the KenApi database.",
      });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Access code not valid" });
  }
};

module.exports = { regValidation, logValidation, jwtValidation };
