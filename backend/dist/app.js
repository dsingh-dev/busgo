"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./src/routes/auth"));
const admin_1 = require("./src/routes/admin");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', auth_1.default);
//Admin Buses
app.use('/api/admin/buses', admin_1.BusesRoutes);
exports.default = app;
