import { toDBFormat } from "@/lib/dateTime";
import { useState, useRef, useEffect } from "react";

// ─── Calendar helpers ─────────────────────────────────────────────────────────

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
const getFirstDay   = (y, m) => new Date(y, m, 1).getDay();

// ─── TimeScroll ───────────────────────────────────────────────────────────────

export const TimeScroll = ({ value, max, onChange, label }) => {
  const ref = useRef(null);
  const ITEM_H = 36;

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = value * ITEM_H;
  }, [value]);

  const handleScroll = () => {
    if (!ref.current) return;
    const idx = Math.round(ref.current.scrollTop / ITEM_H);
    onChange(Math.max(0, Math.min(max, idx)));
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {label && (
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          {label}
        </span>
      )}
      <div
        ref={ref}
        onScroll={handleScroll}
        className="h-[108px] overflow-y-scroll snap-y snap-mandatory rounded-xl bg-white/5"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="h-[36px]" />
        {Array.from({ length: max + 1 }, (_, i) => (
          <div
            key={i}
            onClick={() => {
              onChange(i);
              if (ref.current) ref.current.scrollTop = i * ITEM_H;
            }}
            className={`h-[36px] flex items-center justify-center snap-center cursor-pointer rounded-lg transition-all font-mono text-lg select-none
              ${i === value ? "text-amber-400 bg-amber-400/10 font-bold" : "text-slate-400"}`}
          >
            {String(i).padStart(2, "0")}
          </div>
        ))}
        <div className="h-[36px]" />
      </div>
    </div>
  );
};


export const DateTimePicker = ({
  value = null,
  onChange,
  minDate = null,
  placeholder = "Select departure date & time",
  label = null,
}) => {
  const today = new Date();

  // ── picker open/tab state
  const [open, setOpen]   = useState(false);
  const [view, setView]   = useState("calendar");

  // ── calendar nav
  const [calYear,  setCalYear]  = useState(value ? value.getFullYear()  : today.getFullYear());
  const [calMonth, setCalMonth] = useState(value ? value.getMonth()     : today.getMonth());

  // ── selected date (day only)
  const [selDate, setSelDate] = useState(value ? new Date(value) : null);

  // ── time wheels
  const [hours,   setHours]   = useState(value ? value.getHours()   : 0);
  const [minutes, setMinutes] = useState(value ? value.getMinutes() : 0);
  const [seconds, setSeconds] = useState(value ? value.getSeconds() : 0);

  const containerRef = useRef(null);

  // sync when controlled value changes externally
  useEffect(() => {
    if (value) {
      setSelDate(new Date(value));
      setCalYear(value.getFullYear());
      setCalMonth(value.getMonth());
      setHours(value.getHours());
      setMinutes(value.getMinutes());
      setSeconds(value.getSeconds());
    }
  }, [value]);

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── helpers
  const buildDate = (d = selDate, h = hours, m = minutes, s = seconds) => {
    if (!d) return null;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m, s);
  };

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  };

  const isDisabled = (day) => {
    if (!minDate) return false;
    const d   = new Date(calYear, calMonth, day);
    const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    return d < min;
  };
  const isSelected = (day) =>
    selDate &&
    selDate.getDate() === day &&
    selDate.getMonth() === calMonth &&
    selDate.getFullYear() === calYear;

  const isToday = (day) =>
    today.getDate() === day &&
    today.getMonth() === calMonth &&
    today.getFullYear() === calYear;

  const selectDay = (day) => {
    if (isDisabled(day)) return;
    setSelDate(new Date(calYear, calMonth, day));
  };

  const confirmAndClose = () => {
    const final = buildDate();
    if (final && onChange) onChange(final);
    setOpen(false);
  };

  const clearAndClose = () => {
    setSelDate(null);
    if (onChange) onChange(null);
    setOpen(false);
  };

  const humanDisplay = value
    ? value.toLocaleString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
      })
    : "";

  // ── render
  return (
    <div ref={containerRef} className="relative w-full max-w-sm font-sans">

        {label && (
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            {label}
        </span>
        )}

      {/* Input trigger */}
      <div className="relative">
        <input
          readOnly
          value={humanDisplay}
          placeholder={placeholder}
          onClick={() => setOpen((o) => !o)}
          className={`w-full px-4 py-3 pr-10 rounded-xl text-sm cursor-pointer outline-none transition-all
            bg-white/5 placeholder:text-slate-500 backdrop-blur border border-white/10
            ${open
              ? "border border-amber-400 shadow-[0_0_0_3px_rgba(240,192,96,0.15)]"
              : "border border-white/10"
            }`}
        />
      </div>

      {open && (
        <div className="absolute top-full mt-2 w-[320px] z-50 rounded-2xl overflow-hidden
          bg-gradient-to-br from-[#1A2435] to-[#141D2B]
          border border-white/10 shadow-2xl">

          {/* ── Tabs */}
          <div className="flex border-b border-white/10">
            {["calendar", "time"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition
                  ${view === v
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "text-slate-500"
                  }`}
              >
                {v === "calendar" ? "📅 Date" : "🕐 Time"}
              </button>
            ))}
          </div>

          {/* ── Calendar view */}
          {view === "calendar" && (
            <>
              {/* Month nav */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <button
                  onClick={prevMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition text-base"
                >
                  ‹
                </button>
                <span className="text-sm font-bold text-white tracking-wide">
                  {MONTH_NAMES[calMonth]} {calYear}
                </span>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition text-base"
                >
                  ›
                </button>
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-[2px] px-3 pb-3">
                {/* Day headers */}
                {DAY_LABELS.map((d) => (
                  <div key={d} className="h-8 flex items-center justify-center text-[10px] font-bold tracking-widest text-slate-600 uppercase">
                    {d}
                  </div>
                ))}

                {/* Empty cells before first day */}
                {Array.from({ length: getFirstDay(calYear, calMonth) }, (_, i) => (
                  <div key={`e${i}`} />
                ))}

                {/* Day cells */}
                {Array.from({ length: getDaysInMonth(calYear, calMonth) }, (_, i) => {
                  const day = i + 1;
                  const dis = isDisabled(day);
                  const sel = isSelected(day);
                  const tod = isToday(day);

                  return (
                    <div
                      key={day}
                      onClick={() => selectDay(day)}
                      className={`h-[34px] flex items-center justify-center rounded-lg text-[13px] select-none transition-all
                        ${dis
                          ? "text-slate-700 cursor-not-allowed"
                          : "cursor-pointer"
                        }
                        ${sel
                          ? "bg-amber-400 text-[#1A2435] font-bold"
                          : tod
                          ? "border border-amber-400/40 text-amber-400 font-semibold"
                          : !dis
                          ? "text-slate-300 hover:bg-white/10"
                          : ""
                        }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {view === "time" && (
            <div className="flex items-center justify-center gap-2 py-4 px-4">
              <TimeScroll value={hours}   max={23} onChange={setHours}   label="HH" />
              <span className="text-amber-400 text-xl font-mono mt-3">:</span>
              <TimeScroll value={minutes} max={59} onChange={setMinutes} label="MM" />
              <span className="text-amber-400 text-xl font-mono mt-3">:</span>
              <TimeScroll value={seconds} max={59} onChange={setSeconds} label="SS" />
            </div>
          )}

          {/* ── DB format preview */}
          {selDate && (
            <div className="text-center text-[11px] text-slate-600 font-mono tracking-wide pb-1">
              {toDBFormat(buildDate())}
            </div>
          )}

          {/* ── Footer */}
          <div className="flex gap-2 p-3">
            <button
              onClick={clearAndClose}
              className="flex-1 py-2 rounded-lg border border-white/10 text-slate-400 text-sm font-semibold hover:text-white hover:border-white/20 transition"
            >
              Clear
            </button>
            <button
              onClick={selDate ? confirmAndClose : undefined}
              className={`flex-[2] py-2 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-300 text-[#1A2435] text-sm font-bold tracking-wide transition
                ${selDate ? "opacity-100 cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};