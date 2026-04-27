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
      page = 1,
      limit = 10,
      from,
      to,
      date,
      name,
      sortField,
      sortOrder
    } = query;
    
    const skip = (Number(page) - 1) * Number(limit);

    const where: Prisma.BusWhereInput = {};
    
    if (from) where.fromCityId = Number(from);
    if (to) where.toCityId = Number(to);

    if (name) {
      where.name = {
        contains: name,
        mode: "insensitive",
      };
    }
  
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

    const allowedSortFields = ["name", "price", "departure", "arrival"];

    let orderBy: Prisma.BusOrderByWithRelationInput = { id: "desc" };

    if (
      sortField &&
      allowedSortFields.includes(sortField)
    ) {
      orderBy = {
        [sortField]: sortOrder === "asc" ? "asc" : "desc",
      };
    }

    const [buses, total] = await Promise.all([
      prisma.bus.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          fromCity: true,
          toCity: true,
          amenities: {
            include: {
              amenity: true,
            }
          },
        },
        orderBy: orderBy,
      }),
      prisma.bus.count({ where }),
    ]);
  
    return {
      data: buses.map(busResource),
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  };

export const create = async (data: Bus) => {
  const { amenities, ...busData } = data;

  return prisma.bus.create({
    data: {
      ...busData,

      amenities: {
        create: amenities.map((id) => ({
          amenityId: id,
        })),
      },
    },
  });
};

export const update = async (
  { id, data } : 
  { id: number; data: Partial<Bus> }
) => {
  const { amenities, ...busData } = data;

  return prisma.bus.update({
    where: { id },
    data: {
      ...busData,
      amenities: amenities
        ? {
            deleteMany: {},
            create: amenities.map((id) => ({
              amenityId: id,
            })),
          }
        : undefined,
    },
    include: {
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });
};

export const remove = async (id: number) => {
    return prisma.bus.delete({
      where: { id },
    });
}

export const findCity = async (city: number) => {
    const res = await prisma.city.findUnique({
        where: { id: city },
      });

    return res;
}

export const findCities = async (query: string) => {
    const cities = await prisma.city.findMany({
        where: {
        name: {
            contains: query,
            mode: "insensitive",
        },
        },
        take: 10,
    });

    return cities;
}

export const getAmenities = async () => {
  const amenities = await prisma.amenity.findMany();

  return amenities;
}