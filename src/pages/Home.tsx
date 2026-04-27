import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useBooking } from "@/context/BookingContext";
import { cities } from "@/data/mockData";
import { ArrowRight, MapPin, Calendar, Shield, Clock, Star, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const { setTravelDate } = useBooking();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !date) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (from === to) {
      toast({ title: "Source and destination cannot be the same", variant: "destructive" });
      return;
    }
    setTravelDate(date);
    navigate(`/buses?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
  };

  const features = [
    { icon: Shield, title: "Safe Travel", desc: "Verified operators & sanitized buses" },
    { icon: Clock, title: "On-Time", desc: "98% punctuality across all routes" },
    { icon: Star, title: "Best Prices", desc: "Lowest fares guaranteed" },
    { icon: Headphones, title: "24/7 Support", desc: "Round the clock customer care" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-4 py-20 text-primary-foreground md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(32_95%_52%/0.3),transparent_60%)]" />
        <div className="container relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Book Your Bus Tickets
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
              Travel across the country with comfort and convenience. Find the best routes at unbeatable prices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mx-auto mt-10 max-w-3xl shadow-2xl">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Select city"
                        list="cities-from"
                        className="pl-9"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                      />
                      <datalist id="cities-from">
                        {cities.map((c) => <option key={c} value={c} />)}
                      </datalist>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Select city"
                        list="cities-to"
                        className="pl-9"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      />
                      <datalist id="cities-to">
                        {cities.map((c) => <option key={c} value={c} />)}
                      </datalist>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="date"
                        className="pl-9"
                        min={new Date().toISOString().split("T")[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      Search <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center font-display text-2xl font-bold text-foreground md:text-3xl">
          Why Travel With Us
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              <Card className="text-center shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
