
import { AuthRequest } from '../types/express';
import * as authService from '../services/auth.service';
import { NextFunction, Response } from 'express';

const omitPassword = (user: { password?: string | null; [k: string]: unknown }) => {
  const { password: _p, ...rest } = user;
  return rest;
};

export const register = async (
  req: AuthRequest,
  res: Response,
) => {
    const result = await authService.registerUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      user: omitPassword(result.user),
      token: result.token,
    });
};

export const loginAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
    const result = await authService.loginAdmin({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({
      user: omitPassword(result.user),
      token: result.token,
    });
};