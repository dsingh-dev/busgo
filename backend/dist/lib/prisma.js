import "dotenv/config";
import { PrismaPostgresAdapter } from '@prisma/adapter-ppg';
import { PrismaClient } from "../../generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPostgresAdapter({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };
