import React from "react";
import { useNavigate } from "react-router-dom";

function ReportDetails() {
  const navigate = useNavigate();
  const reportData = {
    reportId: 1,
    generatedOn: "09 February 2026",
    startDate: "05 February 2026",
    endDate: "07 February 2026",

    overallScore: 68,
    overallSummary:
      "Your habits show generally positive patterns with some areas that need improvement. Consistency in hydration, sleep, and stress management will help improve your long-term organ health.",

    organs: [
      {
        id: 1,
        name: "Heart",
        avg: 80,
        max: 90,
        min: 68,
        score: 80,
        explanation:
          "Heart health is good due to regular physical activity and balanced hydration.",
      },
      {
        id: 2,
        name: "Brain",
        avg: 71,
        max: 88,
        min: 48,
        score: 71,
        explanation:
          "Brain health shows moderate stability but inconsistent sleep affects performance.",
      },
      {
        id: 6,
        name: "Stomach",
        avg: 69,
        max: 90,
        min: 51,
        score: 69,
        explanation:
          "Digestive patterns fluctuate due to irregular meal timing.",
      },
    ],

    habits: {
      positive: [
        "Adequate physical activity on most days",
        "Balanced diet on 4 out of 7 days",
        "Good water consumption on most days",
      ],
      negative: [
        "Inconsistent sleep schedule",
        "Higher stress reported on 3 days",
        "Low physical movement on 2 days",
      ],
    },

    streaks: [
      { text: "Adequate physical activity", days: 3, type: "positive" },
      { text: "Balanced diet maintained", days: 2, type: "positive" },
      { text: "Low sleep duration", days: 2, type: "negative" },
    ],

    recommendations: [
      "Drink 2-3 liters of water daily.",
      "Maintain regular sleep of 7-8 hours.",
      "Add at least 20-30 minutes of physical activity.",
      "Reduce stress with relaxation and breathing exercises.",
    ],
  };

  const getStatusFromScore = (score) => {
    if (score >= 75) return "Good";
    if (score >= 50) return "Moderate";
    return "Need Attention";
  };

  const getStatusColor = (status) => {
    if (status === "Good") return "text-green-600";
    if (status === "Moderate") return "text-yellow-500";
    return "text-red-500";
  };
  const overallStatus = getStatusFromScore(reportData.overallScore);

  return (
    <div className="min-h-[982px] w-full flex justify-center bg-white">
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
              Report {reportData.reportId}
            </h1>
          </div>

          <p className="text-xs">Generated on {reportData.generatedOn}</p>

          <p className="text-xs">
            {reportData.startDate} - {reportData.endDate}
          </p>
        </div>

        {/* Overall Summary */}
        <div className="bg-[#0A3B5C] rounded-2xl p-4 text-white mb-5 shadow-md">
          <div className="flex justify-between mb-2">
            <p className="font-semibold">Overall Summary</p>

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-400 text-black font-semibold text-xs">
              {overallStatus}
            </span>
          </div>

          <p className="text-[13px] text-gray-100">
            {reportData.overallSummary}
          </p>
        </div>

        {/* Organ Table */}
        <section className="mb-6">
          <h2 className="font-semibold mb-3 text-[#111827]">
            Organ-wise Health Analysis
          </h2>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-gray-100 px-3 py-2 text-[12px] font-semibold text-gray-600">
              <span>Organ</span>
              <span className="text-center">Avg</span>
              <span className="text-center">Max</span>
              <span className="text-center">Min</span>
              <span className="text-center">Status</span>
            </div>

            {/* Table Rows */}
            {reportData.organs.map((organ, index) => {
              const status = getStatusFromScore(organ.score);

              return (
                <div
                  key={organ.id}
                  className={`grid grid-cols-5 px-3 py-3 text-[13px] items-center
${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
hover:bg-green-50 transition`}
                >
                  {/* Organ */}
                  <span className="font-medium text-gray-800">
                    {organ.name}
                  </span>

                  {/* Avg */}
                  <span className="text-center text-gray-700">{organ.avg}</span>

                  {/* Max */}
                  <span className="text-center text-gray-700">{organ.max}</span>

                  {/* Min */}
                  <span className="text-center text-gray-700">{organ.min}</span>

                  {/* Status */}
                  <span className="flex justify-center">
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] font-semibold
              ${
                status === "Good"
                  ? "bg-green-100 text-green-700"
                  : status === "Moderate"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
                    >
                      {status}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Organ Explanation */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2">Organ-wise Explanation</h2>

          <div className="space-y-3">
            {reportData.organs.map((organ) => (
              <div key={organ.id}>
                <h3 className="font-semibold text-[#14AE5C]">{organ.name}</h3>

                <p className="text-[13px] text-gray-700">{organ.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Habit Summary */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2">Habit Summary</h2>

          <div className="mb-3">
            <h3 className="font-semibold text-green-700">Positive Habits</h3>
            <ul className="list-disc pl-5 text-[13px]">
              {reportData.habits.positive.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-red-600">Negative Habits</h3>
            <ul className="list-disc pl-5 text-[13px]">
              {reportData.habits.negative.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Habit Streaks */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2">Your Habit Streaks</h2>

          <div className="bg-[#FFF4E5] rounded-2xl p-4 space-y-3">
            {reportData.streaks.map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-lg">
                  {s.type === "positive" ? "🔥" : "👎"}
                </span>

                <p className="text-[13px]">
                  {s.text} x{s.days} days
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-6">
          <h2 className="font-semibold mb-2">Recommendations</h2>

          <div className="bg-white rounded-2xl border p-4 space-y-2">
            {reportData.recommendations.map((rec, i) => (
              <div key={i} className="flex gap-2">
                <i className="fa-regular fa-circle-check mt-1"></i>
                <p className="text-[13px]">{rec}</p>
              </div>
            ))}
          </div>
        </section>

        <button className="w-full py-3 rounded-full bg-[#14AE5C] text-white font-semibold shadow-md">
          Download PDF Report
        </button>
      </div>
    </div>
  );
}

export default ReportDetails;
