const Joi = require("joi");

const schema = Joi.object({
    tokenService: Joi.string().required(),
});

module.exports = schema;
