import { body } from 'express-validator';

export const sendMessageValidation = [
  body('receiver')
    .isMongoId()
    .withMessage('Invalid receiver ID'),
  body('content')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ max: 2000 })
    .withMessage('Message cannot exceed 2000 characters'),
]; 