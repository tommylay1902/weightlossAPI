const Joi = require("joi");

const schema = Joi.object({
    name: Joi.string(),
    calories: Joi.number(),
    fat: Joi.number(),
    carbs: Joi.number(),
    protein: Joi.number(),
});

module.exports = schema;
