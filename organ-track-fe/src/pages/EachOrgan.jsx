import React, { useMemo, useState } from "react";
import brainImg from "../assets/images/brain-removebg-preview.png";
import { useNavigate } from "react-router-dom";

function EachOrgan() {
  // TODO: replace this with real score from API or navigation state
  const currentScore = 30;
  const navigate = useNavigate();

  const scoreConfig = useMemo(() => {
    const clamped = Math.max(0, Math.min(100, currentScore));

    if (clamped < 50) {
      return {
        label: "Need Attention",
        badgeClasses: "bg-red-500 text-white",
        ringColor: "#ef4444",
        score: clamped,
      };
    }

    if (clamped < 75) {
      return {
        label: "Moderate",
        badgeClasses: "bg-yellow-400 text-black",
        ringColor: "#facc15",
        score: clamped,
      };
    }

    return {
      label: "Good",
      badgeClasses: "bg-green-400 text-black",
      ringColor: "#22c55e",
      score: clamped,
    };
  }, [currentScore]);

  const [activeRange, setActiveRange] = useState("week"); // "week" | "month" | "year"

  const rangeOrder = ["week", "month", "year"];

  const rangeLabelMap = {
    week: "Current Week Analysis",
    month: "Current Month Analysis",
    year: "Current Year Analysis",
  };

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

  const progressAngle = (scoreConfig.score / 100) * 360;

  const chartShapes = {
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
  };

  const currentShape = chartShapes[activeRange];

  const xLabelMap = {
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    month: ["Week 1", "Week 2", "Week 3", "Week 4"],
    year: [
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
    ],
  };

  const xLabelPositions = xLabelMap[activeRange].map((label, index, arr) => {
    const count = arr.length - 1 || 1;
    const x = 10 + (220 * index) / count;
    return { label, x };
  });

  const yTicks = [0, 25, 50, 75, 100];

  return (
    <div className="min-h-[982px] w-full flex justify-center bg-white">
      {/* Mobile container */}
      <div className="w-full max-w-[402px] px-1 pt-6 pb-10">
        {/* Title */}
        <div className="flex items-center justify-center relative mb-4">
          <button
            onClick={() => navigate("/")}
            className="absolute left-0 text-lg px-2 py-1 rounded-full hover:bg-gray-100"
          >
            ←
          </button>

          <h1 className="text-xl font-semibold">Your Brain</h1>
        </div>

        {/* Brain image */}
        <div className="flex justify-center mb-4">
          <div className="w-full h-32 rounded-3xl bg-white shadow-md flex items-center justify-center">
            <img
              src={brainImg}
              alt="Brain"
              className="w-32 h-24 object-contain"
            />
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-[#0A3B5C] rounded-2xl p-5 text-white flex justify-between items-center mb-6 shadow-lg">
          {/* Condition */}
          <div>
            <p className="text-sm mb-2 font-semibold" style={{ fontSize:20 }}>
              Brain Condition
            </p>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${scoreConfig.badgeClasses}`}
            >
              {scoreConfig.label}
            </span>
          </div>

          {/* Score Circle */}
          <div className="relative flex items-center justify-center w-24 h-24">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${scoreConfig.ringColor} ${progressAngle}deg, rgba(15,23,42,0.75) 0deg)`,
              }}
            />
            <div className="relative flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#0A3B5C] border border-slate-700 text-center">
              
              <span className="mt-1 text-[9px] uppercase tracking-wide font-semibold">
                Current Score
              </span>
              <p className="text-2xl font-extrabold leading-none">
                {scoreConfig.score}
              </p>
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
          <p className="text-xs font-medium text-gray-700">
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
              type="button"
              onClick={() => setActiveRange(rangeKey)}
              className={`text-[11px] px-3 py-1 rounded-full border ${
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

        {/* Chart card */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-800">Organ Score</p>
            <span className="flex items-center gap-1 text-[11px] text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              {activeRange === "week" && "This week"}
              {activeRange === "month" && "This month"}
              {activeRange === "year" && "This year"}
            </span>
          </div>
          <div className="h-[160px] bg-gradient-to-b from-[#F6F7FB] to-[#E7ECFB] rounded-xl border border-gray-100 px-3 pt-4 pb-3">
            <svg
              viewBox="0 0 240 120"
              className="w-full h-full text-xs text-gray-400"
            >
              {/* horizontal grid lines */}
              <g stroke="#E5E7EB" strokeWidth="1">
                <line x1="0" y1="100" x2="240" y2="100" />
                <line x1="0" y1="75" x2="240" y2="75" />
                <line x1="0" y1="50" x2="240" y2="50" />
                <line x1="0" y1="25" x2="240" y2="25" />
              </g>

              {/* y-axis labels */}
              {yTicks.map((val) => (
                <text
                  key={val}
                  x={0}
                  y={105 - (val / 100) * 80}
                  fontSize="8"
                  fill="#9CA3AF"
                >
                  {val}
                </text>
              ))}

              {/* previous period line */}
              {currentShape.previous && (
                <polyline
                  points={currentShape.previous}
                  fill="none"
                  stroke="#A5B4FC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />
              )}

              {/* current period line */}
              <polyline
                points={currentShape.current}
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* dots on current line */}
              {currentShape.current.split(" ").map((point, index) => {
                const [x, y] = point.split(",").map(Number);
                return (
                  <circle
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    cx={x}
                    cy={y}
                    r={3}
                    fill="#22C55E"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* x-axis labels */}
              {xLabelPositions.map(({ label, x }) => (
                <text
                  key={label}
                  x={x}
                  y={118}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#9CA3AF"
                >
                  {label}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Current Date */}
        <button
          type="button"
          className="bg-gray-100 text-xs px-3 py-1 rounded-full mb-4 border border-gray-200 text-gray-700"
        >
          Current Date
        </button>

        {/* Summary */}
        <div className="text-center mb-6">
          <h3 className="font-semibold mb-2 text-gray-900">
            Summary of Brain Today
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your brain health is currently stable but under moderate stress.
            Improving stress management and physical activity can significantly
            boost your cognitive well-being.
          </p>
        </div>

        {/* Positive habits */}
        <div className="bg-[#E5F9ED] rounded-2xl p-4 mb-4 shadow-sm">
          <h4 className="font-semibold mb-2 text-gray-900">
            Positive habit effects on your Brain
          </h4>

          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>
              Adequate sleep duration supports memory, attention, and cognitive
              recovery.
            </li>
            <li>
              Proper hydration contributes to healthy brain function and
              concentration.
            </li>
          </ul>
        </div>

        {/* Negative habits */}
        <div className="bg-[#FFE5E5] rounded-2xl p-4 mb-4 shadow-sm">
          <h4 className="font-semibold mb-2 text-gray-900">
            Negative habit effects on your Brain
          </h4>

          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>
              Lack of physical activity negatively impacts blood circulation to
              the brain.
            </li>
            <li>
              High sugar intake may cause energy fluctuations and reduced mental
              clarity.
            </li>
          </ul>
        </div>

        {/* Conditions */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-4 shadow-sm">
          <h4 className="font-semibold mb-3 text-gray-900">
            Identified Conditions
          </h4>

          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Increased mental stress</li>
            <li>• Mild reduction in concentration</li>
            <li>• Early signs of cognitive fatigue</li>
          </ul>
        </div>

        {/* Risk Assessment */}
        <div className="bg-[#0A3B5C] text-white rounded-2xl p-4 mb-4 shadow-lg">
          <h4 className="font-semibold mb-3">Risk Level Assessment</h4>

          <div className="space-y-2 text-sm">
            <p>
              Stress impact :
              <span className="bg-emerald-400 text-black px-2 py-1 rounded ml-2 text-xs font-semibold">
                Low
              </span>
            </p>

            <p>
              Cognitive Performance Risk :
              <span className="bg-yellow-400 text-black px-2 py-1 rounded ml-2 text-xs font-semibold">
                Medium
              </span>
            </p>

            <p>
              Sleep Impact :
              <span className="bg-red-500 px-2 py-1 rounded ml-2 text-xs font-semibold">
                High
              </span>
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-[#22C55E] rounded-2xl p-4 shadow-md">
          <h4 className="font-semibold mb-3 text-gray-900">Recommendations</h4>

          <ul className="text-sm text-gray-800 list-disc pl-5 space-y-1">
            <li>Practice 5–10 minutes of relaxation.</li>
            <li>Add light physical activity (walking, stretching).</li>
            <li>Reduce sugar intake and increase healthy food intake.</li>
            <li>Maintain a consistent deep sleep schedule.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EachOrgan;
