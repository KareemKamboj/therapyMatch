/**
 * @fileoverview Application-wide constants and configuration values
 * Centralizes all magic numbers and configuration settings
 */

/**
 * Authentication related constants
 */
export const AUTH = {
  /** JWT token expiration time in hours */
  TOKEN_EXPIRY: '24h',
  /** Minimum password length for user registration */
  MIN_PASSWORD_LENGTH: 8,
  /** Maximum failed login attempts before temporary lockout */
  MAX_LOGIN_ATTEMPTS: 5,
  /** Account lockout duration in minutes */
  LOCKOUT_DURATION: 15,
} as const;

/**
 * API rate limiting configuration
 */
export const RATE_LIMITS = {
  /** Window size in minutes */
  WINDOW_MINUTES: 15,
  /** Maximum requests per window */
  MAX_REQUESTS: 100,
} as const;

/**
 * Matching algorithm weights and thresholds
 */
export const MATCHING = {
  /** Weights for different matching criteria (total should be 100) */
  WEIGHTS: {
    LANGUAGES: 30,
    THERAPY_TYPES: 25,
    SPECIALTIES: 25,
    AVAILABILITY: 20,
  },
  /** Minimum match score to be considered a potential match */
  MIN_MATCH_SCORE: 40,
  /** Default number of matches to return */
  DEFAULT_MATCH_LIMIT: 10,
  /** Maximum number of matches that can be requested */
  MAX_MATCH_LIMIT: 50,
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  /** Default page size */
  DEFAULT_PAGE_SIZE: 20,
  /** Maximum allowed page size */
  MAX_PAGE_SIZE: 100,
} as const;

/**
 * Validation constants
 */
export const VALIDATION = {
  /** Maximum length for text fields */
  MAX_TEXT_LENGTH: 1000,
  /** Maximum number of items in arrays */
  MAX_ARRAY_LENGTH: 50,
  /** Maximum file upload size in bytes */
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
} as const;

/**
 * HTTP Status codes used in the application
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Error messages used across the application
 */
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You must be logged in to access this resource',
  FORBIDDEN: 'You do not have permission to access this resource',
  NOT_FOUND: 'The requested resource was not found',
  VALIDATION_ERROR: 'Invalid input data',
  INTERNAL_ERROR: 'An unexpected error occurred',
  RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later',
} as const;

/**
 * Success messages used across the application
 */
export const SUCCESS_MESSAGES = {
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
} as const; 