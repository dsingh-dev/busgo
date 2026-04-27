"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bus_controller_1 = require("../controllers/bus.controller");
const admin_1 = require("../middleware/admin");
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const BusesRoutes = () => {
    const router = express_1.default.Router();
    router.use(admin_1.adminMiddleware);
    router.post('/buses', bus_controller_1.create);
    console.log((0, express_list_endpoints_1.default)(router));
    return router;
};
exports.BusesRoutes = BusesRoutes;
