/**
 * @fileoverview Main server entry point for TherapyMatch API.
 * Sets up Express application with middleware, database connection, and routes.
 * Implements error handling and basic health check endpoint.
 */

import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import helperRoutes from './routes/helper';
import seekerRoutes from './routes/seeker';

// Load environment variables from .env file
dotenv.config();

/**
 * Express application instance
 * @type {Express}
 */
const app: Express = express();

// Middleware Configuration
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // HTTP request logger

/**
 * MongoDB Connection
 * Establishes connection to MongoDB using connection string from environment variables.
 * Implements basic error handling and logging.
 */
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process on connection failure
  });

// API Routes Configuration
app.use('/api/auth', authRoutes);   // Authentication routes (login, register)
app.use('/api/helper', helperRoutes); // Helper-specific routes
app.use('/api/seeker', seekerRoutes); // Seeker-specific routes

/**
 * Health Check Endpoint
 * Basic route to verify API is running
 * @route GET /
 * @returns {object} Success message
 */
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Welcome to TherapyMatch API',
    status: 'healthy',
    version: '1.0.0'
  });
});

/**
 * Global Error Handler
 * Catches all unhandled errors and returns appropriate response
 * Logs error stack trace for debugging
 * 
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Next middleware function
 */
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
    🚀 Server is running on port ${PORT}
    📝 API Documentation: http://localhost:${PORT}/
    🔧 Environment: ${process.env.NODE_ENV}
  `);
}); 