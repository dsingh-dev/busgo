import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { generateAccessToken } from '../utils/generateTokens';

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (existingUser?.email === data.email) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = generateAccessToken({ id: user.id, role: user.role });

  return { user, token };
};

export const loginAdmin = async (data: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (!user) throw new Error('Invalid credentials');

  if (user.password == null) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateAccessToken({ id: user.id, role: user.role });

  return { user, token };
};