import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import mongoose from 'mongoose';

interface JwtPayload {
  id: string;
}

// Define AuthRequest as a generic type that extends Request
export interface AuthRequest<P = any> extends Request<P> {
  user?: IUser & { _id: mongoose.Types.ObjectId };
}

// Define a custom RequestHandler type that uses AuthRequest
export type AuthRequestHandler<P = any> = RequestHandler<P, any, any, any>;

export const protect: AuthRequestHandler = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ message: 'Not authorized to access this route' });
      return; // Explicitly return to prevent further execution
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return; // Explicitly return to stop execution
    }

    // Attach user to request
    req.user = user as IUser & { _id: mongoose.Types.ObjectId };
    next(); // Call next middleware
  } catch (error) {
    res.status(401).json({ message: 'Not authorized to access this route' });
  }
};