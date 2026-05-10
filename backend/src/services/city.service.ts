import { prisma } from "../lib/prisma";

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