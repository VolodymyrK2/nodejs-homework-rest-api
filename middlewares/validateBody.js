const { HttpError } = require('../helpers');

const validateBody = (schema, isPatch = false) => {
  const errorMessage = isPatch ? 'missing field favorite' : 'missing fields';
  const func = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      next(HttpError(400, errorMessage));
    }
    const { error } = schema.validate(req.body);
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
