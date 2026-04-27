import { Amenity, Bus, BusAmenity, City } from "../../generated/prisma/client";

type BusWithAmenities = Bus & {
    fromCity: City | null;
    toCity: City | null;
    amenities: (BusAmenity & {
        amenity: Amenity;
    })[];
};

export const busResource = (bus: BusWithAmenities) => {
  return {
    id: bus.id,
    name: bus.name,
    fromCityId: bus.fromCityId,
    toCityId: bus.toCityId,
    
    fromCity: bus.fromCity
      ? {
          id: bus.fromCity.id,
          name: bus.fromCity.name,
          state: bus.fromCity.state,
        }
      : null,

    toCity: bus.toCity
      ? {
          id: bus.toCity.id,
          name: bus.toCity.name,
          state: bus.toCity.state,
        }
      : null,
      
    price: bus.price,
    type: bus.type,
    totalSeats: bus.totalSeats,

    departure: bus.departure,
    arrival: bus.arrival,

    amenityIds: bus.amenities.map(a => a.amenity.id),

    amenities: bus.amenities.map(a => ({
      id: a.amenity.id,
      name: a.amenity.name,
    })),
  };
};