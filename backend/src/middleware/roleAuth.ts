import { Request, Response, NextFunction } from 'express';

export const requireRole = (role: 'seeker' | 'helper') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ 
        message: `Access denied. ${role === 'helper' ? 'Only helpers' : 'Only seekers'} can access this route.` 
      });
    }

    next();
  };
}; 