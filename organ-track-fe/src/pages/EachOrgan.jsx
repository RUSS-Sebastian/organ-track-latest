import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import organImages from "../data/organImages";
import axios from "../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subYears, isAfter } from "date-fns";

function EachOrgan() {
  const navigate = useNavigate();
  const { organId } = useParams();

  // Always define hooks first
  const [organData, setOrganData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeRange, setActiveRange] = useState("week");
  const [selectedDate, setSelectedDate] = useState(new Date()); // Today by default
  const [calendarOpen, setCalendarOpen] = useState(false); // toggle calendar popup
  const [chartData, setChartData] = useState({ current: {}, previous: {} });
  // UseMemo for scoreConfig safely
  const scoreConfig = useMemo(() => {
    const score = organData?.score ?? 0; // default 0 if organData is null

    if (score < 50)
      return {
        label: "Need Attention",
        badgeClasses: "bg-red-500 text-white",
        ringColor: "#ef4444",
        score,
      };
    if (score < 75)
      return {
        label: "Moderate",
        badgeClasses: "bg-yellow-400 text-black",
        ringColor: "#facc15",
        score,
      };
    return {
      label: "Good",
      badgeClasses: "bg-green-400 text-black",
      ringColor: "#22c55e",
      score,
    };
  }, [organData]);

  const fetchOrganByDate = async (date) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formattedDate = formatDate(date); // YYYY-MM-DD string for backend

      const res = await axios.get(
        `/organ-report-specific/${organId}?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      setOrganData(res.data);
      setSelectedDate(date); // Keep as Date object!
    } catch (err) {
      console.error("Failed to fetch organ data for date:", err);
      setOrganData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (organId) fetchOrganByDate(selectedDate);
  }, [organId, selectedDate]);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `/organ-chart/${organId}?range=${activeRange}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );
        setChartData(res.data);
      } catch (err) {
        console.error("Failed to fetch chart:", err);
        setChartData({ current: {}, previous: {} });
      } finally {
        setLoading(false);
      }
    };

    if (organId) fetchChart();
  }, [organId, activeRange]);

  const progressAngle = (scoreConfig.score / 100) * 360;

  const formatDate = (date) => {
    const d = typeof date === "string" ? new Date(date) : date; // always Date
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10);
  };

  // Get YYYY-MM-DD in local timezone
  const todayLocal = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  /* ===== ORGAN IMAGE MAP ===== */

  const toCamelCase = (str) => {
    return str
      .replace(/\s(.)/g, (_, group1) => group1.toUpperCase()) // capitalize letters after spaces
      .replace(/\s/g, "") // remove spaces
      .replace(/^(.)/, (_, group1) => group1.toLowerCase()); // lowercase first letter
  };
  // Safe access
  const organName = organData?.organ
    ? organData.organ.charAt(0).toUpperCase() + organData.organ.slice(1)
    : "";
  const organImage = organData?.organ
    ? organImages[toCamelCase(organData.organ)]
    : null;

  const rangeOrder = ["week", "month", "year"];

  const rangeLabelMap = {
    week: "Current Week Analysis",
    month: "Current Month Analysis",
    year: "Current Year Analysis",
  };

  // --- Generate X-axis labels ---
  const xLabels = useMemo(() => {
    if (activeRange === "week")
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    if (activeRange === "month")
      return ["Week 1", "Week 2", "Week 3", "Week 4"];
    if (activeRange === "year")
      return [
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
    return [];
  }, [activeRange]);

  // --- Map scores to points ---
  const generateSVGPoints = (scores) => {
    const points = [];
    const totalPoints = xLabels.length;
    for (let i = 0; i < totalPoints; i++) {
      const x = 10 + (220 * i) / (totalPoints - 1 || 1);

      // Determine date or week/month key
      const key =
        activeRange === "week"
          ? Object.keys(scores)[i]
          : activeRange === "month"
            ? Object.keys(scores)[i]
            : Object.keys(scores)[i];

      let score = scores[key] ?? 0; // default to 0 if missing
      const y = 100 - (score / 100) * 80;
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  if (loading)
    return <div className="text-center mt-10 mx-auto">Loading...</div>;
  if (!organData)
    return <div className="text-center mt-10 mx-auto">No data found</div>;
  /*const chartShapes = {
    week: {
      current: "10,90 40,60 70,75 100,40 130,70 160,50 190,65 220,35",
      previous: "10,80 40,50 70,65 100,30 130,60 160,40 190,55 220,25",
    },
    month: {
      current: "10,85 30,60 60,70 90,45 120,55 150,35 190,65 220,40",
      previous: "10,70 30,50 60,55 90,35 120,45 150,30 190,55 220,30",
    },
    year: {
      current: "10,95 30,70 60,80 90,55 120,60 150,40 180,85 210,35 230,60",
      previous: null,
    },
  };*/

  const currentPoints = generateSVGPoints(chartData.current);
  const previousPoints =
    Object.keys(chartData.previous).length > 0
      ? generateSVGPoints(chartData.previous)
      : null;

  const yTicks = [0, 25, 50, 75, 100];

  // --- Range navigation ---
  const handlePrevRange = () => {
    const idx = rangeOrder.indexOf(activeRange);
    const nextIdx = (idx - 1 + rangeOrder.length) % rangeOrder.length;
    setActiveRange(rangeOrder[nextIdx]);
  };
  const handleNextRange = () => {
    const idx = rangeOrder.indexOf(activeRange);
    const nextIdx = (idx + 1) % rangeOrder.length;
    setActiveRange(rangeOrder[nextIdx]);
  };

  /*const xLabelPositions = xLabelMap[activeRange].map((label, index, arr) => {
    const count = arr.length - 1 || 1;
    const x = 10 + (220 * index) / count;
    return { label, x };
  });*/

  return (
    <div className="min-h-[982px] w-full flex justify-center bg-white">
      <div className="w-full max-w-[402px] px-2 pt-6 pb-10">
        {/* TITLE */}
        <div className="flex items-center justify-center relative mb-4">
          <button
            onClick={() => navigate("/")}
            className="absolute left-0 text-lg px-2 py-1 rounded-full hover:bg-gray-100"
          >
            ←
          </button>

          <h1 className="text-xl font-semibold">Your {organName}</h1>
        </div>

        {/* ORGAN IMAGE */}
        <div className="flex justify-center mb-4">
          <div className="w-full h-32 rounded-3xl bg-white shadow-md flex items-center justify-center">
            {organImage && (
              <img
                src={organImage}
                alt={organData.organ}
                className="w-32 h-24 object-contain"
              />
            )}
          </div>
        </div>

        {/* SCORE CARD */}
        <div className="bg-[#0A3B5C] rounded-2xl p-5 text-white flex justify-between items-center mb-6 shadow-lg">
          <div>
            <p className="text-lg font-semibold mb-2">{organName} Condition</p>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${scoreConfig.badgeClasses}`}
            >
              {scoreConfig.label}
            </span>
          </div>

          <div className="relative flex items-center justify-center w-24 h-24">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${scoreConfig.ringColor} ${progressAngle}deg, rgba(15,23,42,0.75) 0deg)`,
              }}
            />

            <div className="relative flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#0A3B5C] border border-slate-700">
              <span className="text-[12px] uppercase">Score</span>

              <p className="text-2xl font-bold">{scoreConfig.score}</p>
            </div>
          </div>
        </div>

        {/* Analysis Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={handlePrevRange}
            className="text-lg px-2 py-1 rounded-full hover:bg-gray-100"
          >
            ←
          </button>

          <p className="text-[14px] font-medium text-gray-700">
            {rangeLabelMap[activeRange]}
          </p>

          <button
            type="button"
            onClick={handleNextRange}
            className="text-lg px-2 py-1 rounded-full hover:bg-gray-100"
          >
            →
          </button>
        </div>

        {/* Range Pills */}
        <div className="flex justify-center gap-2 mb-4">
          {rangeOrder.map((rangeKey) => (
            <button
              key={rangeKey}
              onClick={() => setActiveRange(rangeKey)}
              className={`text-[14px] px-3 py-1 rounded-full border ${
                activeRange === rangeKey
                  ? "bg-[#0A3B5C] text-white border-[#0A3B5C]"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {rangeKey === "week" && "Week"}
              {rangeKey === "month" && "Month"}
              {rangeKey === "year" && "Year"}
            </button>
          ))}
        </div>

        {/* Chart */}
        {/* Chart */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[14px] font-medium text-gray-800">Organ Score</p>
            <div className="flex gap-2 items-center text-[12px]">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>Current {activeRange}</span>
              </div>
              {previousPoints && (
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-blue-300 rounded-full"></span>
                  <span>Previous {activeRange}</span>
                </div>
              )}
            </div>
          </div>

          <div className="h-[160px] bg-gradient-to-b from-[#F6F7FB] to-[#E7ECFB] rounded-xl border border-gray-100 px-3 pt-4 pb-3">
            <svg viewBox="0 0 240 120" className="w-full h-full">
              {/* Horizontal grid lines */}
              <g stroke="#E5E7EB" strokeWidth="1">
                {yTicks.map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={100 - (y / 100) * 80}
                    x2="240"
                    y2={100 - (y / 100) * 80}
                  />
                ))}
              </g>

              {/* Y-axis labels */}
              {yTicks.map((val) => (
                <text
                  key={val}
                  x={0}
                  y={105 - (val / 100) * 80}
                  fontSize="9"
                  fill="#9CA3AF"
                >
                  {val}
                </text>
              ))}

              {/* Previous line */}
              {previousPoints && (
                <polyline
                  points={previousPoints}
                  fill="none"
                  stroke="#A5B4FC"
                  strokeWidth="2"
                />
              )}

              {/* Current line */}
              <polyline
                points={currentPoints}
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
              />

              {/* Circles */}
              {currentPoints.split(" ").map((pt, idx) => {
                const [x, y] = pt.split(",").map(Number);
                return <circle key={idx} cx={x} cy={y} r={3} fill="#22C55E" />;
              })}

              {/* X-axis labels */}
              {xLabels.map((label, idx) => {
                const x = 10 + (220 * idx) / (xLabels.length - 1 || 1);
                return (
                  <text
                    key={label}
                    x={x}
                    y={118}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#9CA3AF"
                  >
                    {label}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="px-3 py-1 rounded-full border bg-gray-100 hover:bg-gray-200"
          >
            {formatDate(selectedDate)} {/* Safe formatting for display */}
          </button>
        </div>

        {calendarOpen && (
          <div className="flex justify-center mb-4 z-50">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setCalendarOpen(false);
              }}
              inline
              maxDate={new Date()} // disable future
              minDate={subYears(new Date(), 5)} // optional: last 5 years
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
        )}

        {/* SUMMARY */}
        <div className="text-center mb-6">
          <h3 className="font-semibold text-lg mb-2 text-gray-900">
            {organData.summaryTitle}
          </h3>

          <p className="text-[14px] text-gray-600 leading-relaxed">
            {organData.summary}
          </p>
        </div>

        {/* POSITIVE HABITS */}
        <div className="bg-[#E5F9ED] rounded-2xl p-4 mb-4 shadow-sm">
          <h4 className="font-semibold text-[15px] mb-2">
            Positive habit effects on your {organData.organ}
          </h4>

          <ul className="text-[14px] text-gray-700 list-disc pl-5 space-y-1">
            {organData.positiveHabits.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* NEGATIVE HABITS */}
        <div className="bg-[#FFE5E5] rounded-2xl p-4 mb-4 shadow-sm">
          <h4 className="font-semibold text-[15px] mb-2">
            Negative habit effects on your {organData.organ}
          </h4>

          <ul className="text-[14px] text-gray-700 list-disc pl-5 space-y-1">
            {organData.negativeHabits.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* CONDITIONS */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-4 shadow-sm">
          <h4 className="font-semibold text-[15px] mb-3">
            Identified Conditions
          </h4>

          <ul className="text-[14px] text-gray-700 space-y-2">
            {organData.conditions.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="bg-[#22C55E] rounded-2xl p-4 shadow-md">
          <h4 className="font-semibold text-[15px] mb-3">Recommendations</h4>

          <ul className="text-[14px] text-gray-800 list-disc pl-5 space-y-1">
            {organData.recommendations.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EachOrgan;
