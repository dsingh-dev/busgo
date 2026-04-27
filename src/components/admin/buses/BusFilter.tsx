import { useState } from "react";
import { FilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import CitiesDropdown from "./CitiesDropdown";
import { DateTimePicker } from "@/components/ui/dateTimePicker";

export default function BusFilter({ onChange }) {
  const [filters, setFilters] = useState({
    from: null,
    to: null,
    departure: null,
    arrival: null
  });

  const update = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onChange(updated);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-4 space-y-3 overflow-visible z-40" align="end"
        sideOffset={8}>
        
        <div>
          <label className="text-xs">From</label>
          <CitiesDropdown
            value={filters.from}
            onChange={(city) => update("from", city.id)}
          />
        </div>

        <div>
          <label className="text-xs">To</label>
          <CitiesDropdown
            value={filters.to}
            onChange={(city) => update("to", city.id)}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}