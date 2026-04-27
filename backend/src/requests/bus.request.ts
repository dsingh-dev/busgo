import { z } from "zod";

const BusSchema = z.object({
    name: z.string().min(1).max(255),
    fromCityId: z.coerce.number(),
    toCityId: z.coerce.number(),
    price: z.coerce.number(),
    type: z.enum(["AC", "NONAC", "SEATER", "SLEEPER", "SEATERAC", "SLEEPERAC"]),
    totalSeats: z.coerce.number(),
    departure: z.string().datetime(),
    arrival: z.string().datetime(),
    amenities: z.array(z.number()).optional(),
});

export const storeBusRequest = BusSchema.transform((data) => ({
    ...data,
    departure: new Date(data.departure),
    arrival: new Date(data.arrival),
    amenities: data.amenities ?? [],
}));

export const updateBusRequest = BusSchema
  .partial()
  .transform((data) => ({
    ...data,
    departure: data.departure ? new Date(data.departure) : undefined,
    arrival: data.arrival ? new Date(data.arrival) : undefined,
    amenities: data.amenities ?? [],
  }));