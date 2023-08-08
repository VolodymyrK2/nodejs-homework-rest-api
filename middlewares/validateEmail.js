const { HttpError } = require('../helpers');

const validateEmail = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.details.forEach((err) => {
        if (err.type.includes('any.required')) {
          next(HttpError(400, err.message));
        }
      });

      next(HttpError(400, `Please enter the ${error.details[0].context.label} field in the correct format`));
    }
    next();
  };

  return func;
};

module.exports = validateEmail;
