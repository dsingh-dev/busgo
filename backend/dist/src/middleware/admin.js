"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const auth_1 = require("./auth");
const adminMiddleware = (req, res, next) => {
    (0, auth_1.protect)(req, res, () => {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Admin only' });
        }
        next();
    });
};
exports.adminMiddleware = adminMiddleware;
