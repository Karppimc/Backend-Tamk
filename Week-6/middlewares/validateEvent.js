const Joi = require('joi');

const eventSchema = Joi.object({
    title: Joi.string().min(1).required(),
    date: Joi.date().required(),
    location: Joi.string().min(1).required(),
    description: Joi.string().allow(''),
});

const validateEvent = (req, res, next) => {
    const { error } = eventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateEvent;
