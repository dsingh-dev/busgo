import { createContext, useContext, useState, ReactNode } from "react";
import { Bus } from "@/data/mockData";

interface BookingData {
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

const initial: BookingData = {
  bus: null,
  selectedSeats: [],
  passengerName: "",
  passengerEmail: "",
  passengerPhone: "",
  travelDate: "",
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingData>(initial);

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBus: (bus) => setBooking((b) => ({ ...b, bus })),
        setSeats: (selectedSeats) => setBooking((b) => ({ ...b, selectedSeats })),
        setPassengerInfo: (passengerName, passengerEmail, passengerPhone) =>
          setBooking((b) => ({ ...b, passengerName, passengerEmail, passengerPhone })),
        setTravelDate: (travelDate) => setBooking((b) => ({ ...b, travelDate })),
        reset: () => setBooking(initial),
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
