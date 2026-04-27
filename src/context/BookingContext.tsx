import { createContext, useContext, useState, ReactNode } from "react";
import { Bus } from "@/data/mockData";

export interface BookingData {
  bus: Bus | null;
  selectedSeats: number[];
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  travelDate: string;
}

interface BookingContextType {
  booking: BookingData;
  setBus: (bus: Bus) => void;
  setSeats: (seats: number[]) => void;
  setPassengerInfo: (name: string, email: string, phone: string) => void;
  setTravelDate: (date: string) => void;
  reset: () => void;
}

export const initialBooking: BookingData = {
  bus: null,
  selectedSeats: [],
  passengerName: "",
  passengerEmail: "",
  passengerPhone: "",
  travelDate: "",
};

export const BookingContext = createContext<BookingContextType | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
