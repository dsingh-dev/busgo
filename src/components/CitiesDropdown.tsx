import { useEffect, useRef, useState } from "react";

interface City {
  id: number;
  name: string;
}

interface Props {
  label?: string;
  value: number | null;
  onChange: (city: City) => void;
  placeholder?: string;
}

export default function CitiesDropdown({
  label,
  value,
  onChange,
  placeholder = "Search city...",
}: Props) {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!search.trim()) {
      setCities([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);

    const delay = setTimeout(async () => {
      try {
        const token = localStorage.getItem("bus_admin_token");
        const res   = await fetch(
          `/api/admin/cities?search=${encodeURIComponent(search.trim())}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );
        const data = await res.json();

        const raw: City[] = Array.isArray(data)
          ? data
          : Array.isArray(data.cities)
          ? data.cities
          : Array.isArray(data.data)
          ? data.data
          : [];

        const seenIds   = new Set<number>();
        const seenNames = new Set<string>();
        const unique    = raw.filter((c) => {
          const key = c.name.trim().toLowerCase();
          if (seenIds.has(c.id) || seenNames.has(key)) return false;
          seenIds.add(c.id);
          seenNames.add(key);
          return true;
        });

        setCities(unique);
        setShowDropdown(unique.length > 0);
        setActiveIndex(-1);
      } catch (err) {
        console.error("City fetch error:", err);
        setCities([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  useEffect(() => {
    if (!value) return;
    const fetchCityById = async () => {
      try {
        const res  = await fetch(`/api/admin/cities/${value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bus_admin_token")}`,
          },
        });
        const data: City = await res.json();
        setSearch(data.name ?? "");
      } catch (err) {
        console.error("City prefill error:", err);
      }
    };
    fetchCityById();
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || cities.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, cities.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectCity(cities[activeIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const selectCity = (city: City) => {
    setSearch(city.name);
    setShowDropdown(false);
    setActiveIndex(-1);
    onChange(city);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">

      {/* Label */}
      {label && (
        <label className="block text-xs font-medium text-gray-600 mb-1">
          {label}
        </label>
      )}

      {/* Input — light theme to match the rest of the form */}
      <div className="relative">
        <input
          type="text"
          value={search}
          placeholder={placeholder}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => {
            if (cities.length > 0) setShowDropdown(true);
          }}
          onKeyDown={handleKeyDown}
          className={`
            w-full h-10 pl-3 pr-9 rounded-lg border
            bg-white text-sm text-gray-900
            placeholder:text-gray-400
            outline-none transition-all
            ${showDropdown
              ? "border-amber-400 ring-2 ring-amber-400/20"
              : "border-gray-300 hover:border-gray-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            }
          `}
        />

        {/* Spinner / pin icon */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          {loading ? (
            <svg className="animate-spin h-4 w-4 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </span>
      </div>

      {/* Results dropdown */}
      {showDropdown && cities.length > 0 && (
        <ul
          className="absolute top-full mt-1 w-full z-50
            rounded-lg border border-gray-200 bg-white
            shadow-lg max-h-48 overflow-y-auto py-1"
          style={{ scrollbarWidth: "none" }}
        >
          {cities.map((city, idx) => (
            <li
              key={city.id}
              onMouseDown={(e) => {
                e.preventDefault(); // prevent blur before click registers
                selectCity(city);
              }}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-sm transition-colors
                ${activeIndex === idx
                  ? "bg-amber-50 text-amber-700"
                  : "text-gray-800 hover:bg-gray-50"
                }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              {city.name}
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {showDropdown && !loading && search.trim() && cities.length === 0 && (
        <div className="absolute top-full mt-1 w-full z-50
          rounded-lg border border-gray-200 bg-white shadow-lg
          px-3 py-3 text-sm text-gray-400 text-center">
          No cities found for &ldquo;{search}&rdquo;
        </div>
      )}
    </div>
  );
}