export const BusType = {
    AC: "AC",
    NONAC: "NONAC",
    SEATER : "SEATER",
    SLEEPER : "SLEEPER",
    SEATERAC : "SEATERAC",
    SLEEPERAC : "SLEEPERAC"
  } as const;

export type BusTypeType = (typeof BusType)[keyof typeof BusType];

export const BUS_TYPE_OPTIONS = [
  { value: "AC", label: "AC" },
  { value: "NONAC", label: "Non-AC" },
  { value: "SEATER", label: "Seater" },
  { value: "SLEEPER", label: "Sleeper" },
  { value: "SEATERAC", label: "AC Seater" },
  { value: "SLEEPERAC", label: "AC Sleeper" },
];