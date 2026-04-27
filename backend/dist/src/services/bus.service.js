"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBus = void 0;
const prisma_1 = require("../lib/prisma");
const createBus = async (data) => {
    const bus = await prisma_1.prisma.bus.create({
        data: {
            name: data.name,
            from: data.from,
            to: data.to,
            totalSeats: data.totalSeats,
            type: data.type,
            price: data.price,
        },
    });
    return { bus };
};
exports.createBus = createBus;
