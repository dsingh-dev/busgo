import { useSearchParams, useNavigate } from "react-router-dom";
import { Bus, searchBuses } from "@/data/mockData";
import { useBooking } from "@/context/BookingContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star, Users, Wifi, BatteryCharging, Bus as BusIcon, Tv, CookingPot, PillBottle, WifiIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/dateTime";
import { useCities } from "@/hooks/use-cities";
import BlanketIcon from "@/components/icons/BlanketIcon";

const amenityIcons: Record<string, React.ReactNode> = {
  "WIFI": <WifiIcon className="h-3.5 w-3.5" />,
  "CHARGING_PORT": <BatteryCharging className="h-3.5 w-3.5" />,
  "BLANKET": <BlanketIcon className="h-3.5 w-3.5" />,
  "WATER_BOTTLE": <PillBottle className="h-3.5 w-3.5" />,
  "MEAL": <CookingPot className="h-3.5 w-3.5" />,
  "TV": <Tv className="h-3.5 w-3.5" />,
};

export default function BusListing() {
  const [params] = useSearchParams();
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;
  const date = params.get("date") || "";
  const navigate = useNavigate();
  const { setBus } = useBooking();
  const [loading, setLoading] = useState(false);
  const [buses, setBuses] = useState([]);
  const { data: cities } = useCities();

  const handleSearchBuses = async ({from, to}) => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/auth/buses?from=${from}&to=${to}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "bus_user_token"
            )}`,
          },
        }
      );

      const data = await res.json();
      setBuses(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (from && to) {
      handleSearchBuses({ from: Number(from), to: Number(to) });
    }
  }, [from, to]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">
          {cities?.find(c => c.id === Number(from))?.name} → {cities?.find(c => c.id === Number(to))?.name}
        </h1> 
        <p className="text-sm text-muted-foreground">{date} · {buses.length} buses found</p>
      </div>

      {buses.length === 0 ? (
        <Card className="py-16 text-center">
          <CardContent>
            <BusIcon className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 font-display text-lg font-semibold text-foreground">No buses found</p>
            <p className="text-sm text-muted-foreground">Try searching for a different route or date.</p>
            <Button className="mt-4" onClick={() => navigate("/")}>Back to Search</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {buses.map((bus, i) => (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Card className="overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-foreground">{bus.name}</h3>
                        <Badge variant="secondary" className="text-xs">{bus.type}</Badge>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-display text-lg font-bold text-foreground">{formatDate(bus.departure)}</p>
                          <p className="text-xs text-muted-foreground">{bus.fromCity.name}</p>
                        </div>
                        <div className="flex flex-1 flex-col items-center">
                          <span className="text-xs text-muted-foreground">- - -</span>
                          <div className="mt-1 h-px w-full bg-border" />
                        </div>
                        <div className="text-center">
                          <p className="font-display text-lg font-bold text-foreground">{formatDate(bus.arrival)}</p>
                          <p className="text-xs text-muted-foreground">{bus.toCity.name}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-accent" /> {bus.rating}</span>
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {bus.availableSeats} seats</span>
                        {bus.amenities.slice(0, 6).map((a) => (
                          <span key={a.id} className="flex items-center gap-1">
                            {amenityIcons[a.name] || ""} {a.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                      <p className="font-display text-2xl font-bold text-primary">${bus.price}</p>
                      <Button
                        size="sm"
                        onClick={() => {
                          setBus(bus);
                          navigate(`/bus/${bus.id}`);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
