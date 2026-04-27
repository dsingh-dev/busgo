import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../types/express';

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.slice(7);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: number };

    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.id) },
    });

    if (!user) {
      return res.status(401).json({ message: 'Access denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
