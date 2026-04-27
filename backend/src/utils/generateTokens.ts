import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: { id: number; role?: string }) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role ?? 'USER',
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );
};