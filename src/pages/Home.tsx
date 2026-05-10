import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useBooking } from "@/context/BookingContext";
import { ArrowRight, Shield, Clock, Star, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import CitiesDropdown from "@/components/CitiesDropdown";
import { toDBFormat } from "@/lib/dateTime";
import { DateTimePicker } from "@/components/ui/dateTimePicker";

export default function Home() {
  const [from, setFrom] = useState<number | null>(null);
  const [to, setTo] = useState<number | null>(null);

  const [date, setDate] = useState<Date | null>(null);

  const { setTravelDate } = useBooking();
  const navigate          = useNavigate();
  const { toast }         = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const dateStr = new Date(date).toISOString().split("T")[0];

    if (!from || !to || !dateStr) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (from === to) {
      toast({ title: "Source and destination cannot be the same", variant: "destructive" });
      return;
    }

    setTravelDate(dateStr);
    navigate(`/buses?from=${from}&to=${to}&date=${dateStr}`);
  };

  const features = [
    { icon: Shield,      title: "Safe Travel",  desc: "Verified operators & sanitized buses" },
    { icon: Clock,       title: "On-Time",       desc: "98% punctuality across all routes" },
    { icon: Star,        title: "Best Prices",   desc: "Lowest fares guaranteed" },
    { icon: Headphones,  title: "24/7 Support",  desc: "Round the clock customer care" },
  ];

  return (
    <div>
      <section className="relative bg-primary px-4 py-20 text-primary-foreground md:py-28">
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
            <Card className="mx-auto mt-10 max-w-3xl" style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)" }}>
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">

                  {/* From */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">From</Label>
                    <CitiesDropdown
                      value={from}
                      onChange={(fromCity) => setFrom(fromCity.id)}
                      placeholder="Select source city"
                    />
                  </div>

                  {/* To */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">To</Label>
                    <CitiesDropdown
                      value={to}
                      onChange={(toCity) => setTo(toCity.id)}
                      placeholder="Select destination city"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Date</Label>
                    <div className="[&_input]:h-10 [&_input]:rounded-lg [&_input]:border [&_input]:border-input [&_input]:bg-background [&_input]:px-3 [&_input]:text-sm [&_input]:shadow-sm [&_input]:text-foreground [&_input]:placeholder:text-muted-foreground">
                    <DateTimePicker
                      value={date}
                      onChange={(val: Date | null) => setDate(val)}
                      minDate={new Date()}
                      label=""
                      placeholder="Select date & time"
                      timer={false}
                    />
                    </div>
                  </div>

                  {/* Search button */}
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