const { HttpError } = require('../helpers');

const validateBody = (validator) => {
  const func = (req, res, next) => {
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      next(HttpError(400, 'missing fields'));
    }
    const { error } = validator(req.body);
    if (error) {
      error.details.forEach((err) => {
        if (err.type.includes('any.required')) {
          next(HttpError(400, `missing required ${err.context.label} field`));
        }
      });
      next(HttpError(400, `Please enter the ${error.details[0].context.label} field in the correct format`));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
