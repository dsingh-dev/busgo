import { BookingContext, BookingData, initialBooking } from "@/context/BookingContext";
import { ReactNode, useState } from "react";

export function BookingProvider({ children }: { children: ReactNode }) {
    const [booking, setBooking] = useState<BookingData>(initialBooking);
  
    return (
      <BookingContext.Provider
        value={{
          booking,
          setBus: (bus) => setBooking((b) => ({ ...b, bus })),
          setSeats: (selectedSeats) => setBooking((b) => ({ ...b, selectedSeats })),
          setPassengerInfo: (passengerName, passengerEmail, passengerPhone) =>
            setBooking((b) => ({ ...b, passengerName, passengerEmail, passengerPhone })),
          setTravelDate: (travelDate) => setBooking((b) => ({ ...b, travelDate })),
          reset: () => setBooking(initialBooking),
        }}
      >
        {children}
      </BookingContext.Provider>
    );
  }