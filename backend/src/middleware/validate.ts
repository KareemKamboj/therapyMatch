import { RequestHandler } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }

    res.status(400).json({ errors: errors.array() });
  };
}; 