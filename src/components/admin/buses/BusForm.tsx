import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select";
import { BUS_TYPE_OPTIONS, BusTypeType } from "@/lib/enums";
import { SaveIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import BusAmenitiesCheckbox from "./BusAmenitiesCheckbox";
import { DateTimePicker } from "@/components/ui/dateTimePicker";
import CitiesDropdown from "@/components/CitiesDropdown";

interface Amenities {
    amenityId: number;
}

interface BusFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bus?: {
    id?: number;
    name: string;
    fromCityId: number;
    toCityId: number;
    price: string;
    type: "AC" | "NONAC" | "SEATER" | "SLEEPER" | "SEATERAC" | "SLEEPERAC";
    totalSeats: number;
    departure?: string | Date;
    arrival?: string | Date;
    amenities?: Amenities[];
  };
}

interface BusFormState {
  name: string;
  fromCityId: number;
  toCityId: number;
  price: string;
  type: BusTypeType;
  totalSeats: number;
  departure: Date | null;
  arrival: Date | null;
  amenities?: number[];
}

const inputCls =
  "w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground " +
  "placeholder:text-muted-foreground shadow-sm outline-none ring-offset-background " +
  "focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors";

const getInitialState = (): BusFormState => ({
  name: "",
  fromCityId: null,
  toCityId: null,
  price: "",
  type: "NONAC",
  totalSeats: 0,
  departure: null,
  arrival: null,
  amenities: [],
});

const BusFormModal = ({ open, onClose, bus, onSuccess }: BusFormModalProps) => {
  const { toast } = useToast();

  const [form, setForm] = useState<BusFormState>(getInitialState());

  const updateField = <K extends keyof BusFormState>(
    key: K,
    value: BusFormState[K]
  ) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const mapBusToForm = (bus: BusFormModalProps["bus"]): BusFormState => ({
    name: bus.name,
    fromCityId: bus.fromCityId ?? null,
    toCityId: bus.toCityId ?? null,
    price: bus.price,
    type: bus.type,
    totalSeats: bus.totalSeats,
    departure: bus.departure ? new Date(bus.departure) : null,
    arrival: bus.arrival ? new Date(bus.arrival) : null,
    amenities: bus.amenities?.map(a => a.amenityId) ?? [],
  });

  useEffect(() => {
    if (bus) {
      setForm(mapBusToForm(bus));
    } else {
      setForm(getInitialState());
    }
  }, [bus]);

  const handleSubmit = async () => {
    const method = bus?.id ? "PUT" : "POST";
    const url = bus?.id ? `/api/admin/buses/${bus.id}` : `/api/admin/buses`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bus_admin_token")}`,
      },
      body: JSON.stringify({
        ...form,
        departure: form.departure?.toISOString(),
        arrival: form.arrival?.toISOString(),
      }),
    });

    const data = await res.json();
    onSuccess();
    onClose();
    toast({ title: data.status, description: data.message });
  };

  if (!open) return null;

  return (
    <div className="space-y-5 -mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">

      <FieldGroup className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <input
            className={inputCls}
            placeholder="Enter bus name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>Bus Type</FieldLabel>
          <Select
            value={form.type}
            onValueChange={(val) => updateField("type", val as BusTypeType )}
          >
            <SelectTrigger className={inputCls}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                {BUS_TYPE_OPTIONS.map((type) => (
                  <SelectItem className="text-sm" key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
        <BusAmenitiesCheckbox
            selected={form.amenities}
            onChange={(ids) => updateField("amenities", ids)
            }
          />
        </Field>
      </FieldGroup>

      <FieldGroup className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>From</FieldLabel>
          <div className="[&>*]:w-full [&_button]:h-10 [&_button]:rounded-lg [&_button]:border [&_button]:border-input [&_button]:bg-background [&_button]:px-3 [&_button]:text-sm [&_button]:shadow-sm">
            <CitiesDropdown
              value={form.fromCityId}
              onChange={(city) => updateField("fromCityId", Number(city.id))}
            />
          </div>
        </Field>

        <Field>
          <FieldLabel>To</FieldLabel>
          <div className="[&>*]:w-full [&_button]:h-10 [&_button]:rounded-lg [&_button]:border [&_button]:border-input [&_button]:bg-background [&_button]:px-3 [&_button]:text-sm [&_button]:shadow-sm">
            <CitiesDropdown
              value={form.toCityId}
              onChange={(city) => updateField("toCityId", Number(city.id))}
            />
          </div>
        </Field>
      </FieldGroup>

      <FieldGroup className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Departure Date / Time</FieldLabel>
          <div className="[&_input]:h-10 [&_input]:rounded-lg [&_input]:border [&_input]:border-input [&_input]:bg-background [&_input]:px-3 [&_input]:text-sm [&_input]:shadow-sm [&_input]:text-foreground [&_input]:placeholder:text-muted-foreground">
            <DateTimePicker
              value={form.departure ? new Date(form.departure) : null}
              onChange={(val) => updateField("departure", val)}
              minDate={new Date()}
              label=""
            />
          </div>
        </Field>
      </FieldGroup>
      <FieldGroup className="grid grid-cols-2 gap-4">
        <Field>
            <FieldLabel>Arrival Date / Time</FieldLabel>
            <div className="[&_input]:h-10 [&_input]:rounded-lg [&_input]:border [&_input]:border-input [&_input]:bg-background [&_input]:px-3 [&_input]:text-sm [&_input]:shadow-sm [&_input]:text-foreground [&_input]:placeholder:text-muted-foreground">
              <DateTimePicker
                value={form.arrival ? new Date(form.arrival) : null}
                onChange={(val) => updateField('arrival', val)}
                minDate={form.departure}
                placeholder="Select Arrival date & time"
              />
            </div>
          </Field>
      </FieldGroup>

      <FieldGroup className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Price (₹)</FieldLabel>
          <input
            className={inputCls}
            placeholder="Enter price"
            value={form.price}
            onChange={(e) => updateField("price", e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>Total Seats</FieldLabel>
          <input
            className={inputCls}
            type="number"
            placeholder="Enter total seats"
            value={form.totalSeats || ""}
            onChange={(e) => updateField("totalSeats", Number(e.target.value))}
          />
        </Field>
      </FieldGroup>

      <div className="flex justify-end gap-2 pt-1">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="default" onClick={handleSubmit}>
          <SaveIcon className="h-4 w-4 mr-1" /> Save
        </Button>
      </div>
    </div>
  );
};

export default BusFormModal;