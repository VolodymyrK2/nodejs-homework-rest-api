const Joi = require('joi');

exports.createContactValidator = (data) =>
  Joi.object().options({ abortEarly: false })
    .keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).required(),
    })
    .validate(data);
