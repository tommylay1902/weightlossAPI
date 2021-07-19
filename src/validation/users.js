const Joi = require("joi");

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
});

module.exports = schema;
