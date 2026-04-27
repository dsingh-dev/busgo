"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../lib/prisma");
const generateTokens_1 = require("../utils/generateTokens");
const registerUser = async (data) => {
    const existingUser = await prisma_1.prisma.user.findFirst({
        where: { email: data.email },
    });
    if (existingUser?.email === data.email)
        throw new Error('User already exists');
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    });
    const token = (0, generateTokens_1.generateAccessToken)({ id: user.id, role: user.role });
    return { user, token };
};
exports.registerUser = registerUser;
const loginAdmin = async (data) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: { email: data.email },
    });
    if (!user)
        throw new Error('Invalid credentials');
    if (user.password == null)
        throw new Error('Invalid credentials');
    const isMatch = await bcrypt_1.default.compare(data.password, user.password);
    if (!isMatch)
        throw new Error('Invalid credentials');
    const token = (0, generateTokens_1.generateAccessToken)({ id: user.id, role: user.role });
    return { user, token };
};
exports.loginAdmin = loginAdmin;
