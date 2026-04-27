import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/express';
import { protect } from './auth';

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  protect(req, res, () => {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin only' });
    }
    next();
  });
};