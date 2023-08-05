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
}, { versionKey: false });

userSchema.post('save', handleMongooseError);

const authSchema = Joi.object()
  .keys({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });

const updateSubscriptionSchema = Joi.object()
  .keys({
    subscription: Joi.string().valid('starter', 'pro', 'business').required(),
  });

const schemas = { authSchema, updateSubscriptionSchema };
const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
