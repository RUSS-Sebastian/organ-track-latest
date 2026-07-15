import { useState, useRef, useEffect } from "react";
import {
  format,
  subYears,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  setMonth,
  setYear,
  getMonth,
  getYear,
} from "date-fns";

const TODAY = new Date();
const MIN_DATE = subYears(TODAY, 5);

function formatDate(date) {
  return format(date, "yyyy-MM-dd");
}

// ── Popover Calendar ──────────────────────────────────────────────────────────

function DatePickerPopover({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(selected ?? TODAY);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(day) {
    onChange(day);
    setOpen(false);
  }

  function prevMonth() {
    const prev = subMonths(viewDate, 1);
    if (!isBefore(startOfMonth(prev), startOfMonth(MIN_DATE)))
      setViewDate(prev);
  }

  function nextMonth() {
    const next = addMonths(viewDate, 1);
    if (!isAfter(startOfMonth(next), startOfMonth(TODAY))) setViewDate(next);
  }

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewDate), { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(viewDate), { weekStartsOn: 0 }),
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 6 }, (_, i) => getYear(TODAY) - 5 + i);

  const canGoPrev = !isBefore(
    startOfMonth(subMonths(viewDate, 1)),
    startOfMonth(MIN_DATE),
  );
  const canGoNext = !isAfter(
    startOfMonth(addMonths(viewDate, 1)),
    startOfMonth(TODAY),
  );

  return (
    <div ref={ref} className="relative inline-block">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-teal-400 hover:shadow-md transition-all duration-200 text-slate-700 text-sm font-medium"
      >
        <CalendarIcon />
        {formatDate(selected)}
      </button>

      {/* Popover */}
      {open && (
        <div
          className="absolute z-50 mt-2 left-0 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 animate-in"
          style={{ animation: "fadeSlideIn 0.15s ease" }}
        >
          {/* Month / Year header */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevMonth}
              disabled={!canGoPrev}
              className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft />
            </button>

            <div className="flex items-center gap-1.5">
              <select
                value={getMonth(viewDate)}
                onChange={(e) =>
                  setViewDate(setMonth(viewDate, Number(e.target.value)))
                }
                className="text-sm font-semibold text-slate-800 bg-transparent border-none outline-none cursor-pointer hover:text-teal-600"
              >
                {months.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={getYear(viewDate)}
                onChange={(e) =>
                  setViewDate(setYear(viewDate, Number(e.target.value)))
                }
                className="text-sm font-semibold text-slate-800 bg-transparent border-none outline-none cursor-pointer hover:text-teal-600"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={nextMonth}
              disabled={!canGoNext}
              className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium text-slate-400 py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {days.map((day) => {
              const isSelected = isSameDay(day, selected);
              const isToday = isSameDay(day, TODAY);
              const inMonth = isSameMonth(day, viewDate);
              const disabled = isAfter(day, TODAY) || isBefore(day, MIN_DATE);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => !disabled && handleSelect(day)}
                  disabled={disabled}
                  className={[
                    "relative flex items-center justify-center h-9 w-full rounded-xl text-sm transition-all duration-150 font-medium",
                    !inMonth && "opacity-30",
                    disabled && "cursor-not-allowed opacity-25",
                    isSelected
                      ? "bg-teal-500 text-white shadow-md shadow-teal-200"
                      : isToday && !isSelected
                        ? "border border-teal-400 text-teal-600 hover:bg-teal-50"
                        : !disabled
                          ? "text-slate-700 hover:bg-slate-100"
                          : "text-slate-400",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {format(day, "d")}
                  {isToday && !isSelected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer: Today shortcut */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex justify-center">
            <button
              onClick={() => handleSelect(TODAY)}
              className="text-xs text-teal-600 font-medium hover:text-teal-800 transition-colors"
            >
              Go to today
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── Icons (inline SVG, no extra deps) ─────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ✅ THIS IS THE MISSING LINE
export default DatePickerPopover;
