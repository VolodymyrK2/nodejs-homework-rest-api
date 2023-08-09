const Joi = require('joi');
const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: String,
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false });

userSchema.post('save', handleMongooseError);

const authSchema = Joi.object()
  .keys({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });
const emailSchema = Joi.object()
  .keys({
    email: Joi.string().email().required()
      .messages({
        'any.required': 'missing required field email',
      }),
  });

const updateSubscriptionSchema = Joi.object()
  .keys({
    subscription: Joi.string().valid('starter', 'pro', 'business').required()

  });

const schemas = { authSchema, updateSubscriptionSchema, emailSchema };
const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
