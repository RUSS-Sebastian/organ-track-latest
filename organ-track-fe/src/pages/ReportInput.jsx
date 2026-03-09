import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ClipLoader from "react-spinners/ClipLoader";

const ReportInput = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [startMonth, setStartMonth] = useState(new Date());
  const [endMonth, setEndMonth] = useState(new Date());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0); // reset time

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const isLeapYear = (year) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonthArray = [
      31,
      isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonthArray[month];

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);

    for (let i = 1; i <= totalDays; i++) {
      const thisDate = new Date(year, month, i);
      // future dates are null
      days.push(thisDate <= today ? i : null);
    }
    return days;
  };

  const parseDateString = (dateString) => {
    if (!dateString) return null;
    const [month, day, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const validateDates = (newStartDate, newEndDate) => {
    const start = parseDateString(newStartDate);
    const end = parseDateString(newEndDate);

    if (start && end) {
      if (start > end) {
        setError("End date cannot be earlier than start date");
        return false;
      }

      // difference in days
      const diffTime = end.getTime() - start.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays > 2) {
        // <-- now allows only 3 days total
        setError("Date range cannot exceed 3 days");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleStartDateSelect = (day) => {
    if (!day) return;
    const selectedDate = new Date(
      startMonth.getFullYear(),
      startMonth.getMonth(),
      day,
    );
    const formatted = `${selectedDate.getMonth() + 1}/${day}/${selectedDate.getFullYear()}`;
    setStartDate(formatted);
    setShowStartCalendar(false);

    if (endDate) validateDates(formatted, endDate);
  };

  const handleEndDateSelect = (day) => {
    if (!day) return;
    const selectedDate = new Date(
      endMonth.getFullYear(),
      endMonth.getMonth(),
      day,
    );
    const formatted = `${selectedDate.getMonth() + 1}/${day}/${selectedDate.getFullYear()}`;
    setEndDate(formatted);
    setShowEndCalendar(false);

    if (startDate) validateDates(startDate, formatted);
  };

  const handleGenerate = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start date and end date");
      return;
    }
    if (!validateDates(startDate, endDate)) return;

    setError("");
    setLoading(true);
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token"); // adjust if using context/auth provider

      const response = await axios.post(
        "/health-report/generate",
        { start_date: startDate, end_date: endDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      if (response.data?.success) {
        setSuccessMessage("Health report generated successfully!");
      } else {
        setError(response.data?.message || "Failed to generate report.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "API request failed.");
    } finally {
      setLoading(false);
    }
  };

  const isGenerateDisabled = !startDate || !endDate || loading;

  // Calendar component
  const CalendarComponent = ({
    type,
    month,
    onDateSelect,
    onNavigate,
    show,
    onClose,
  }) => {
    if (!show) return null;

    const days = getDaysInMonth(month);

    // Only allow years up to current year
    const years = [];
    for (let i = today.getFullYear(); i >= 1900; i--) years.push(i);

    const handleYearSelect = (year) => {
      const newMonth = new Date(month);
      newMonth.setFullYear(parseInt(year));
      if (newMonth.getFullYear() > today.getFullYear()) return;
      if (
        newMonth.getFullYear() === today.getFullYear() &&
        newMonth.getMonth() > today.getMonth()
      ) {
        newMonth.setMonth(today.getMonth());
      }
      type === "start" ? setStartMonth(newMonth) : setEndMonth(newMonth);
    };

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-green-200 rounded-xl shadow-2xl p-3 z-50 w-full">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-semibold">
              <span className="text-green-700">{months[month.getMonth()]}</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => onNavigate("prev")}
                className="w-6 h-6 flex items-center justify-center border border-green-200 rounded-md hover:bg-green-50"
              >
                <span className="text-green-500 text-sm">←</span>
              </button>
              <button
                onClick={() => {
                  const nextMonth = new Date(month);
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  if (
                    nextMonth.getFullYear() < today.getFullYear() ||
                    (nextMonth.getFullYear() === today.getFullYear() &&
                      nextMonth.getMonth() <= today.getMonth())
                  ) {
                    onNavigate("next");
                  }
                }}
                className="w-6 h-6 flex items-center justify-center border border-green-200 rounded-md hover:bg-green-50"
              >
                <span className="text-green-500 text-sm">→</span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-600 font-medium">Year:</div>
            <select
              value={month.getFullYear()}
              onChange={(e) => handleYearSelect(e.target.value)}
              className="text-sm font-semibold text-green-600 bg-green-50 border border-green-200 rounded-md px-2 py-1 cursor-pointer"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-0 mb-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-bold text-green-600 py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {days.map((day, i) => {
            const dateStr = day
              ? `${month.getMonth() + 1}/${day}/${month.getFullYear()}`
              : "";
            const isSelected =
              (type === "start" && startDate === dateStr) ||
              (type === "end" && endDate === dateStr);

            return (
              <button
                key={i}
                onClick={() => day && onDateSelect(day)}
                disabled={!day}
                className={`aspect-square flex items-center justify-center text-xs rounded-md transition-all duration-200
                  ${!day ? "text-gray-300 cursor-not-allowed" : "hover:bg-green-100 hover:scale-110 hover:shadow-md"}
                  ${day && isSelected ? "bg-green-500 text-white shadow-md" : ""}`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Leap Year info */}
        {month.getMonth() === 1 && (
          <div className="text-center mb-2">
            <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {isLeapYear(month.getFullYear())
                ? "Leap Year - 29 days"
                : "28 days"}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-1 pt-2 border-t border-green-100">
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs border border-green-200 rounded-md text-green-600 hover:bg-green-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-scroll-y bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Back Button */}
      <button
        onClick={() => navigate("/report")}
        className="absolute top-6 left-6 w-[36px] h-[36px] bg-[#1BB137] rounded-lg flex items-center justify-center shadow-md active:scale-95 transition z-20"
      >
        <span className="text-white text-lg font-bold">{"<"}</span>
      </button>
      {/* Main Card with Glass Effect */}
      <div className="w-full max-w-[380px] relative z-10 group -mt-8 md:-mt-16">
        {/* Card Content */}
        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/50">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
              Health Report
            </h1>
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <span className="w-1 h-1 bg-green-400 rounded-full"></span>
              Select your date range
              <span className="w-1 h-1 bg-green-400 rounded-full"></span>
            </p>
          </div>

          {/* Start Date Section */}
          <div className="mb-6 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-gradient-to-b from-green-400 to-green-500 rounded-full"></div>
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Start Date
              </h2>
            </div>
            <div
              onClick={() => {
                setShowStartCalendar(!showStartCalendar);
                setShowEndCalendar(false);
              }}
              className="relative overflow-hidden bg-white/50 backdrop-blur-sm border-2 border-green-200/50 rounded-xl p-3 cursor-pointer hover:border-green-400 hover:bg-white/80 transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">
                  Select Date
                </span>
                <span
                  className={`text-sm font-semibold ${startDate ? "text-gray-800" : "text-gray-400"}`}
                >
                  {startDate || "MM/DD/YYYY"}
                </span>
              </div>
            </div>

            <CalendarComponent
              type="start"
              month={startMonth}
              onDateSelect={handleStartDateSelect}
              onNavigate={(direction) => {
                const newMonth = new Date(startMonth);
                newMonth.setMonth(
                  newMonth.getMonth() + (direction === "prev" ? -1 : 1),
                );
                setStartMonth(newMonth);
              }}
              show={showStartCalendar}
              onClose={() => setShowStartCalendar(false)}
            />
          </div>

          {/* End Date Section */}
          <div className="mb-6 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-full"></div>
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                End Date
              </h2>
            </div>
            <div
              onClick={() => {
                setShowEndCalendar(!showEndCalendar);
                setShowStartCalendar(false);
              }}
              className="relative overflow-hidden bg-white/50 backdrop-blur-sm border-2 border-emerald-200/50 rounded-xl p-3 cursor-pointer hover:border-emerald-400 hover:bg-white/80 transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">
                  Select Date
                </span>
                <span
                  className={`text-sm font-semibold ${endDate ? "text-gray-800" : "text-gray-400"}`}
                >
                  {endDate || "MM/DD/YYYY"}
                </span>
              </div>
            </div>

            <CalendarComponent
              type="end"
              month={endMonth}
              onDateSelect={handleEndDateSelect}
              onNavigate={(direction) => {
                const newMonth = new Date(endMonth);
                newMonth.setMonth(
                  newMonth.getMonth() + (direction === "prev" ? -1 : 1),
                );
                setEndMonth(newMonth);
              }}
              show={showEndCalendar}
              onClose={() => setShowEndCalendar(false)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mb-4 p-3 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-lg"
              style={{ animation: "shake 0.5s ease-in-out" }}
            >
              <p className="text-xs text-red-500 text-center font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50/90 border border-green-200 rounded-lg text-green-600 text-center">
              {successMessage}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerateDisabled}
            className={`
              relative w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 overflow-hidden group
              ${
                isGenerateDisabled
                  ? "bg-gray-200/50 text-gray-400 cursor-not-allowed backdrop-blur-sm"
                  : "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              }
            `}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <ClipLoader size={18} color="#ffffff" />
                <span>Generating...</span>
              </div>
            ) : (
              "Generate Health Report"
            )}
          </button>

          {/* Success Message */}
          {!isGenerateDisabled && !error && (
            <div
              className="mt-3 flex justify-center items-center gap-2"
              style={{ animation: "fadeInUp 0.5s ease-out" }}
            >
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
                <div
                  className="w-1 h-1 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-1 h-1 bg-green-600 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
              <p className="text-xs text-green-600 font-medium">
                Ready to generate
              </p>
            </div>
          )}

          {/* Decorative Footer Dots */}
          <div className="mt-4 flex justify-center gap-1">
            <div className="w-1 h-1 bg-green-200 rounded-full"></div>
            <div className="w-1 h-1 bg-green-300 rounded-full"></div>
            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            <div className="w-1 h-1 bg-green-600 rounded-full"></div>
            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
            <div className="w-1 h-1 bg-green-300 rounded-full"></div>
            <div className="w-1 h-1 bg-green-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ReportInput;
