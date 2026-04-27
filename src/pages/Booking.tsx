import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Booking() {
  const { booking, setPassengerInfo } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const bus = booking.bus;
  if (!bus || booking.selectedSeats.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
        <p className="text-lg font-semibold text-foreground">No booking in progress</p>
        <Button className="mt-4" onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  const total = booking.selectedSeats.length * bus.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    setPassengerInfo(name, email, phone);
    await new Promise((r) => setTimeout(r, 1200));
    navigate("/confirmation");
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 lg:grid-cols-[1fr_340px]"
      >
        {/* Passenger Form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Passenger Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="p-name">Full Name</Label>
                <Input id="p-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-email">Email</Label>
                <Input id="p-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-phone">Phone Number</Label>
                <Input id="p-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Summary */}
        <div className="lg:sticky lg:top-20">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-lg">Trip Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bus</span>
                <span className="font-semibold text-foreground">{bus.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Route</span>
                <span className="text-foreground">{bus.from} → {bus.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">{booking.travelDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Seats</span>
                <span className="font-semibold text-foreground">{booking.selectedSeats.sort((a, b) => a - b).join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price/seat</span>
                <span className="text-foreground">${bus.price}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-display font-semibold text-foreground">Total</span>
                  <span className="font-display text-xl font-bold text-primary">${total}</span>
                </div>
              </div>
              <Button form="booking-form" type="submit" className="w-full" size="lg" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
