const Joi = require("joi");

const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    type: Joi.string().valid("reps", "time"),
});

module.exports = schema;
