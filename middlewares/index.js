const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');
const upload = require('./upload');
const validateEmail = require('./validateEmail');

module.exports = {
  validateBody,
  upload,
  isValidId,
  authenticate,
  validateEmail,
};
