import { useNavigate } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function Confirmation() {
  const { booking, reset } = useBooking();
  const navigate = useNavigate();
  const bus = booking.bus;

  if (!bus) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
        <p className="text-lg font-semibold text-foreground">No booking found</p>
        <Button className="mt-4" onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  const total = booking.selectedSeats.length * bus.price;
  const ticketId = `BG${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-lg items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <Card className="overflow-hidden shadow-xl">
          <div className="bg-success px-6 py-8 text-center text-success-foreground">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
            >
              <CheckCircle className="mx-auto h-16 w-16" />
            </motion.div>
            <h1 className="mt-4 font-display text-2xl font-bold">Booking Confirmed!</h1>
            <p className="mt-1 text-sm opacity-90">Your ticket has been booked successfully</p>
          </div>
          <CardContent className="space-y-4 p-6">
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-center text-xs text-muted-foreground">Ticket ID</p>
              <p className="text-center font-display text-lg font-bold text-foreground">{ticketId}</p>
            </div>

            <div className="space-y-3 text-sm">
              <Row label="Passenger" value={booking.passengerName} />
              <Row label="Email" value={booking.passengerEmail} />
              <Row label="Phone" value={booking.passengerPhone} />
              <div className="border-t border-border" />
              <Row label="Bus" value={bus.name} />
              <Row label="Type" value={bus.type} />
              <Row label="Route" value={`${bus.from} → ${bus.to}`} />
              <Row label="Date" value={booking.travelDate} />
              <Row label="Departure" value={bus.departureTime} />
              <Row label="Arrival" value={bus.arrivalTime} />
              <Row label="Seats" value={booking.selectedSeats.sort((a, b) => a - b).join(", ")} />
              <div className="border-t border-border pt-2">
                <div className="flex justify-between">
                  <span className="font-display font-semibold text-foreground">Total Paid</span>
                  <span className="font-display text-xl font-bold text-primary">${total}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => { reset(); navigate("/"); }}
            >
              Book Another Trip
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
