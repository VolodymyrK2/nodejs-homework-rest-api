const { HttpError } = require('../helpers');

const validateBody = (schema, isPatch) => {
  let errorMessage = 'missing fields';
  if (isPatch) {
    errorMessage = 'missing field favorite';
  }
  const func = (req, res, next) => {
    const {
      name, email, phone, favorite
    } = req.body;

    if (!name && !email && !phone && (favorite === undefined)) {
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

module.exports = {
  validateBody
};
