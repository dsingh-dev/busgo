export interface Bus {
  id: string;
  name: string;
  type: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  rating: number;
  amenities: string[];
  bookedSeats: number[];
}

export const cities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
  "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte",
];

export const mockBuses: Bus[] = [
  {
    id: "bus-1",
    name: "Royal Cruiser",
    type: "AC Sleeper",
    from: "New York",
    to: "Chicago",
    departureTime: "22:00",
    arrivalTime: "06:30",
    duration: "8h 30m",
    price: 45,
    totalSeats: 36,
    availableSeats: 22,
    rating: 4.5,
    amenities: ["WiFi", "Charging Port", "Blanket", "Water Bottle"],
    bookedSeats: [1, 5, 8, 12, 15, 18, 21, 24, 27, 30, 33, 35, 3, 9],
  },
  {
    id: "bus-2",
    name: "Metro Express",
    type: "AC Seater",
    from: "New York",
    to: "Chicago",
    departureTime: "08:00",
    arrivalTime: "16:00",
    duration: "8h 00m",
    price: 35,
    totalSeats: 40,
    availableSeats: 28,
    rating: 4.2,
    amenities: ["WiFi", "Charging Port"],
    bookedSeats: [2, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
  },
  {
    id: "bus-3",
    name: "Silver Line Travels",
    type: "Non-AC Seater",
    from: "New York",
    to: "Chicago",
    departureTime: "14:00",
    arrivalTime: "22:30",
    duration: "8h 30m",
    price: 25,
    totalSeats: 44,
    availableSeats: 35,
    rating: 3.8,
    amenities: ["Water Bottle"],
    bookedSeats: [1, 6, 11, 14, 20, 23, 29, 36, 40],
  },
  {
    id: "bus-4",
    name: "Greenway Deluxe",
    type: "AC Sleeper",
    from: "New York",
    to: "Chicago",
    departureTime: "20:00",
    arrivalTime: "04:00",
    duration: "8h 00m",
    price: 55,
    totalSeats: 30,
    availableSeats: 18,
    rating: 4.7,
    amenities: ["WiFi", "Charging Port", "Blanket", "Snacks", "Entertainment"],
    bookedSeats: [2, 3, 7, 9, 13, 15, 17, 20, 23, 26, 28, 30],
  },
  {
    id: "bus-5",
    name: "City Connect",
    type: "AC Seater",
    from: "New York",
    to: "Chicago",
    departureTime: "06:00",
    arrivalTime: "14:30",
    duration: "8h 30m",
    price: 30,
    totalSeats: 40,
    availableSeats: 32,
    rating: 4.0,
    amenities: ["Charging Port", "Water Bottle"],
    bookedSeats: [5, 10, 15, 20, 25, 30, 35, 38],
  },
];

export function searchBuses(from: string, to: string): Bus[] {
  // Return mock buses with updated from/to
  return mockBuses.map(bus => ({ ...bus, from, to }));
}
