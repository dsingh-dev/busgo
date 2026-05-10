import { Prisma } from '../../generated/prisma/client';
import { BusType } from '../../generated/prisma/enums';
import { prisma } from '../lib/prisma';
import { busResource } from '../resources/bus.resource';

export interface Bus {
    name: string;
    fromCityId: number;
    toCityId: number;
    type: BusType;
    price: number;
    totalSeats: number;
    departure: Date;
    arrival: Date;
    amenities: number[];
}
export interface RequestQuery {
  page?: number;
  limit?: number;
  from?: number;
  to?: number;
  date?: string;
  name?: string;
  sortField?: "name" | "price" | "departure" | "arrival";
  sortOrder?: "asc" | "desc";
}

export const index = async (query: RequestQuery) => {
    const {
      from,
      to,
      date,
    } = query;
    
    const where: Prisma.BusWhereInput = {};
    
    if (from) where.fromCityId = Number(from);
    if (to) where.toCityId = Number(to);

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
  
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
  
      where.departure = {
        gte: start,
        lte: end,
      };
    }

    const [buses, total] = await Promise.all([
      prisma.bus.findMany({
        where,
        include: {
          fromCity: true,
          toCity: true,
          amenities: {
            include: {
              amenity: true,
            }
          },
        },
        orderBy: {id: "desc"},
      }),
      prisma.bus.count({ where }),
    ]);
  
    return {
      data: buses.map(busResource),
      meta: {
        total,
      },
    };
  };