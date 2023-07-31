const Joi = require('joi');
const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object().options({ abortEarly: false })
  .keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^\+?[0-9()\-\s]+$/).required(),
    favorite: Joi.boolean(),
  });
const updateFavoriteSchema = Joi.object()
  .keys({
    favorite: Joi.boolean().required(),
  });

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
