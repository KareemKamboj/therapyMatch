import { body } from 'express-validator';

export const createAppointmentValidation = [
  body('dateTime')
    .isISO8601()
    .withMessage('Invalid date format')
    .custom((value) => {
      const date = new Date(value);
      if (date < new Date()) {
        throw new Error('Appointment date must be in the future');
      }
      return true;
    }),
  body('duration')
    .isInt({ min: 30, max: 120 })
    .withMessage('Duration must be between 30 and 120 minutes'),
  body('type')
    .isIn(['initial', 'followup'])
    .withMessage('Invalid appointment type'),
  body('notes')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
];

export const updateAppointmentValidation = [
  body('status')
    .isIn(['confirmed', 'cancelled', 'completed'])
    .withMessage('Invalid appointment status'),
  body('notes')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  body('meetingLink')
    .optional()
    .isURL()
    .withMessage('Invalid meeting link'),
]; 