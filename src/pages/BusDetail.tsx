import { useNavigate } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function BusDetail() {
  const { booking, setSeats } = useBooking();
  const navigate = useNavigate();
  const { toast } = useToast();
  const bus = booking.bus;

  if (!bus) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
        <p className="text-lg font-semibold text-foreground">No bus selected</p>
        <Button className="mt-4" onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  const selectedSeats = booking.selectedSeats;
  const totalPrice = selectedSeats.length * bus.price;

  const toggleSeat = (seat: number) => {
    if (bus.bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length >= 6) {
        toast({ title: "Maximum 6 seats allowed", variant: "destructive" });
        return;
      }
      setSeats([...selectedSeats, seat]);
    }
  };

  const cols = 4;
  const rows = Math.ceil(bus.totalSeats / cols);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Bus Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground">{bus.name}</h1>
                  <Badge variant="secondary" className="mt-1">{bus.type}</Badge>
                </div>
                <span className="flex items-center gap-1 rounded-lg bg-success/10 px-2.5 py-1 text-sm font-semibold text-success">
                  <Star className="h-4 w-4" /> {bus.rating}
                </span>
              </div>
              <div className="mt-6 flex items-center gap-6">
                <div>
                  <p className="font-display text-2xl font-bold text-foreground">{bus.departureTime}</p>
                  <p className="text-sm text-muted-foreground">{bus.from}</p>
                </div>
                <div className="flex flex-1 flex-col items-center">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{bus.duration}</span>
                  <div className="mt-1 h-px w-full bg-border" />
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-foreground">{bus.arrivalTime}</p>
                  <p className="text-sm text-muted-foreground">{bus.to}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {bus.amenities.map((a) => (
                  <Badge key={a} variant="outline" className="text-xs">{a}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seat Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Select Your Seats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded border border-border bg-secondary" /> Available</span>
                <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-primary" /> Selected</span>
                <span className="flex items-center gap-1.5"><span className="h-4 w-4 rounded bg-muted-foreground/30" /> Booked</span>
              </div>
              <div className="inline-grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}>
                {Array.from({ length: rows * cols }, (_, i) => {
                  const seat = i + 1;
                  if (seat > bus.totalSeats) return <div key={seat} />;
                  const isBooked = bus.bookedSeats.includes(seat);
                  const isSelected = selectedSeats.includes(seat);
                  return (
                    <motion.button
                      key={seat}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleSeat(seat)}
                      disabled={isBooked}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md text-xs font-semibold transition-colors",
                        isBooked && "cursor-not-allowed bg-muted-foreground/20 text-muted-foreground/50",
                        isSelected && "bg-primary text-primary-foreground shadow-md",
                        !isBooked && !isSelected && "border border-border bg-secondary text-foreground hover:border-primary/50"
                      )}
                    >
                      {seat}
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:sticky lg:top-20">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price per seat</span>
                <span className="font-semibold text-foreground">${bus.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Selected seats</span>
                <span className="font-semibold text-foreground">
                  {selectedSeats.length > 0 ? selectedSeats.sort((a, b) => a - b).join(", ") : "None"}
                </span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-display font-semibold text-foreground">Total</span>
                  <span className="font-display text-xl font-bold text-primary">${totalPrice}</span>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                disabled={selectedSeats.length === 0}
                onClick={() => navigate("/booking")}
              >
                Continue to Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
