import { RequestHandler } from 'express';
import { AuthRequest } from './auth';

export const requireRole = (role: 'seeker' | 'helper'): RequestHandler => {
  return (req: AuthRequest, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    if (req.user.role !== role) {
      res.status(403).json({ 
        message: `Access denied. ${role === 'helper' ? 'Only helpers' : 'Only seekers'} can access this route.` 
      });
      return;
    }

    next();
  };
}; 