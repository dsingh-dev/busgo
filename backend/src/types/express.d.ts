import { Request } from 'express';

export interface User {
  name: string | null;
  id: number;
  email: string;
  password: string | null;
  role: UserRole;
  createdAt: Date;
}
export interface AuthRequest extends Request {
  user?: User;
}