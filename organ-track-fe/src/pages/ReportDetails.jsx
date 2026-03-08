import React from "react";
import { useNavigate } from "react-router-dom";

function ReportDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[982px] w-full flex justify-center bg-white">
      {/* Mobile container */}
      <div className="w-full max-w-[402px] px-1 pt-6 pb-10 text-[14px]">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-center relative mb-4">
            <button
              onClick={() => navigate("/")}
              className="absolute left-0 text-lg px-2 py-1 rounded-full hover:bg-gray-100"
            >
              ←
            </button>

            <h1 className="text-center text-[18px] font-semibold text-[#14AE5C]">
              Report 1
            </h1>
          </div>
          <p className="mt-2 text-xs">Generated on 09 February 2026</p>
          <p className="text-xs">05 February 2026 - 07 February 2026</p>
        </div>

        {/* Overall Summary card */}
        <div className="bg-[#0A3B5C] rounded-2xl p-4 text-white mb-5 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold">Overall Summary</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-400 text-black font-semibold text-xs">
              Moderate
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-gray-100">
            Your habits show generally positive patterns with some areas that
            need improvement. Consistency in hydration, sleep, and stress
            management will help improve your long-term organ health.
          </p>
        </div>

        {/* Organ-wise Health Analysis */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2 text-[#111827]">
            Organ-wise Health Analysis
          </h2>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 px-3 py-2 text-[12px] font-semibold text-gray-700">
              <span>Organ</span>
              <span className="text-center">Avg</span>
              <span className="text-center">Max</span>
              <span className="text-center">Min</span>
              <span className="text-center">Status</span>
            </div>

            {[
              { organ: "Heart", avg: 80, max: 90, min: 68, status: "Good" },
              {
                organ: "Brain",
                avg: 71,
                max: 88,
                min: 48,
                status: "Need Attention",
              },
              {
                organ: "Stomach",
                avg: 69,
                max: 90,
                min: 51,
                status: "Moderate",
              },
              { organ: "Liver", avg: 70, max: 81, min: 60, status: "Good" },
              { organ: "Kidney", avg: 71, max: 80, min: 68, status: "Good" },
            ].map((row) => (
              <div
                key={row.organ}
                className="grid grid-cols-5 px-3 py-2 text-[13px] border-b last:border-b-0 border-gray-100 items-center"
              >
                <span className="truncate">{row.organ}</span>
                <span className="text-center">{row.avg}</span>
                <span className="text-center">{row.max}</span>
                <span className="text-center">{row.min}</span>
                <span className="text-center">
                  {row.status === "Good" && (
                    <span className="text-green-600 font-semibold">Good</span>
                  )}
                  {row.status === "Moderate" && (
                    <span className="text-yellow-500 font-semibold">
                      Moderate
                    </span>
                  )}
                  {row.status === "Need Attention" && (
                    <span className="text-red-500 font-semibold">
                      Need Attention
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Organ-wise Explanation */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2 text-[#111827]">
            Organ-wise Explanation
          </h2>

          <div className="space-y-3">
            {["Heart", "Brain", "Stomach"].map((organ) => (
              <div key={organ}>
                <h3 className="font-semibold text-[#14AE5C] mb-1">{organ}</h3>
                <p className="text-[13px] leading-relaxed text-gray-700">
                  Your {organ.toLowerCase()} health is generally good. Regular
                  physical activity and low sedentary time contribute
                  positively. Occasional lack of sleep and hydration may lower
                  your daily score. Staying consistent with healthy habits will
                  help maintain and further improve your {organ.toLowerCase()}{" "}
                  function.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Habit Summary */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2 text-[#111827]">Habit Summary</h2>

          <div className="mb-3">
            <h3 className="font-semibold text-green-700 mb-1">
              Positive Habits
            </h3>
            <ul className="list-disc pl-5 text-[13px] text-gray-700 space-y-1">
              <li>Adequate physical activity on most days</li>
              <li>Balanced diet on 4 out of 7 days</li>
              <li>Good water consumption on most days</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-red-600 mb-1">Negative Habits</h3>
            <ul className="list-disc pl-5 text-[13px] text-gray-700 space-y-1">
              <li>Inconsistent sleep schedule on most days</li>
              <li>Higher stress reported on 3 days</li>
              <li>Low physical movement on 2 days</li>
            </ul>
          </div>
        </section>

        {/* Habit Streaks */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2 text-[#111827]">
            Your Habit Streaks
          </h2>

          <div className="bg-[#FFF4E5] rounded-2xl p-4 space-y-3">
            {[
              "Adequate physical activity on most days x3days",
              "Adequate physical activity on most days x2Days",
              "Adequate physical activity on most days x2Days",
              "Inconsistent sleep schedule x2Days",
              "Inconsistent sleep schedule x2Days",
              "Inconsistent sleep schedule x2Days",
            ].map((text, index) => (
              <div key={text} className="flex items-start gap-2">
                {/* Show 🔥 for first 3, 👎 for the rest */}
                <span className="mt-[2px] text-lg">
                  {index < 3 ? "🔥" : "👎"}
                </span>

                <p className="text-[13px] text-gray-800">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-6">
          <h2 className="font-semibold mb-2 text-[#111827]">Recommendations</h2>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-2">
            {[
              "Drink 2-3 liters of water daily.",
              "Maintain regular sleep of 7-8 hours.",
              "Add at least 20-30 minutes of physical activity.",
              "Reduce stress with relaxation and breathing exercises."
            ].map((text) => (
              <div key={text} className="flex items-start gap-2">
                {/* Circle icon */}
                <i class="fa-regular fa-circle-check mt-1"></i>
                <p className="text-[13px] text-gray-800">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Download button */}
        <button
          type="button"
          className="w-full py-3 rounded-full bg-[#14AE5C] text-white font-semibold shadow-md"
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
}

export default ReportDetails;
