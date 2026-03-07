import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  faArrowLeft,
  faChartSimple,
  faTriangleExclamation,
  faCircleCheck,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";

// Fake backend JSON (replace later with API response)
const fakeData = {
  title: "Track 1",
  date: "11 February 2026",
  riskLevel: "Needs Attention", // Good | Moderate | Needs Attention
  indicators: [
    "Possible Gastritis",
    "Early signs of Acid Reflux",
    "Stomach irritation due to diet and stress",
  ],
  immediateRecommendations: [
    "Avoid spicy, oily, and acidic foods.",
    "Do not skip meals.",
    "Eat smaller portions more frequently.",
    "Drink sufficient water (6–8 glasses daily).",
  ],
  lifestyleAdjustments: [
    "Do not skip meals.",
    "Eat smaller portions more frequently.",
    "Drink sufficient water (6–8 glasses daily).",
    "Avoid spicy, oily, and acidic foods.",
  ],
  seekMedical: [
    "Severe or persistent abdominal pain",
    "Black or tarry stools",
    "Vomiting blood",
    "Sudden weight loss",
  ],
};

const riskConfig = {
  Good: {
    container: "bg-green-100 border-green-400",
    badge: "bg-green-500",
    text: "text-green-700",
    message:
      "Your current symptoms do not indicate an emergency condition, but maintaining healthy habits is recommended.",
  },
  Moderate: {
    container: "bg-yellow-100 border-yellow-400",
    badge: "bg-yellow-500",
    text: "text-yellow-700",
    message:
      "Your current symptoms do not indicate an emergency condition, but attention and lifestyle adjustments are recommended.",
  },
  "Needs Attention": {
    container: "bg-red-100 border-red-400",
    badge: "bg-red-500",
    text: "text-red-700",
    message:
      "Your symptoms may require medical attention. Please monitor closely and consult a healthcare professional if they persist or worsen.",
  },
};

const CheckItem = ({ text, variant = "green" }) => (
  <div className="flex items-start gap-3">
    <div
      className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${
        variant === "red" ? "bg-red-500" : "bg-green-500"
      }`}
    >
      <FontAwesomeIcon icon={faCircleCheck} />
    </div>
    <p className="text-sm text-gray-700">{text}</p>
  </div>
);

export default function TrackAnalysisPage() {
  const { reportId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/track"); // ✅ navigate to /track route
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/ai-report/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
        setLoading(false);
      });
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  const config = riskConfig[data.riskLevel];
  return (
    <div className="min-h-[874px] w-full flex justify-center bg-white">
      <div className="w-full max-w-[402px] px-4 pt-6 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button className="text-xl text-gray-700" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1 className="text-green-600 font-semibold text-lg">{data.title}</h1>
          <span className="text-xs text-gray-500">{data.date}</span>
        </div>

        {/* Analysis Card */}
        <div className="bg-green-100 border border-green-300 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faChartSimple}
                className="text-green-700"
              />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Analysis Result</h2>
              <p className="text-xs text-gray-500">Based on your responses</p>
            </div>
          </div>

          {/* Risk Box */}
          <div
            className={`border rounded-xl p-4 mb-4 flex justify-between items-center ${config.container}`}
          >
            <div className="flex items-center gap-3">
              <div className={`${config.badge} text-white p-2 rounded-full`}>
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </div>
              <div>
                <p className="text-sm text-gray-700">Risk Assessment</p>
                <p className={`font-semibold ${config.text}`}>
                  {data.riskLevel}
                </p>
              </div>
            </div>

            {/* bars */}
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-6 rounded-full ${
                    i <
                    (data.riskLevel === "Good"
                      ? 1
                      : data.riskLevel === "Moderate"
                        ? 2
                        : 3)
                      ? config.badge
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-600 mb-4">{config.message}</p>

          {/* Indicators */}
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Possible Indicators
          </h3>
          <div className="space-y-2">
            {data.indicators.map((item, i) => (
              <div
                key={i}
                className="bg-gray-200 text-gray-700 rounded-xl px-4 py-3 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Recommendations */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-4 border">
          <h3 className="font-semibold text-gray-800 mb-3">
            Immediate Recommendations
          </h3>
          <div className="space-y-3">
            {data.immediateRecommendations.map((rec, i) => (
              <CheckItem key={i} text={rec} />
            ))}
          </div>
        </div>

        {/* Lifestyle */}
        <div className="bg-green-200 rounded-2xl p-4 mb-4">
          <h3 className="font-semibold text-gray-800">Lifestyle Adjustments</h3>
          <p className="text-xs text-gray-600 mb-3">Long-term healthy habits</p>
          <div className="space-y-3">
            {data.lifestyleAdjustments.map((item, i) => (
              <CheckItem key={i} text={item} />
            ))}
          </div>
        </div>

        {/* Seek medical */}
        <div className="rounded-2xl overflow-hidden border mb-4">
          <div className="bg-red-600 text-white text-center py-6 px-4">
            <div className="w-14 h-14 bg-white/90 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>
            <h3 className="font-semibold text-lg">
              Seek Medical Help If You Experience
            </h3>
          </div>

          <div className="p-4 space-y-3 bg-gray-100">
            {data.seekMedical.map((item, i) => (
              <div
                key={i}
                className="bg-gray-200 text-red-600 rounded-xl px-4 py-3 text-sm font-medium"
              >
                {item}
              </div>
            ))}

            {/* Static notice */}
            <div className="bg-indigo-900 text-white rounded-xl p-4 mt-4">
              <div className="font-semibold mb-1">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="text-green-400"
                  />
                  IMPORTANT NOTICE
                </div>
              </div>
              <p className="text-sm text-white/90">
                If any of these occur, please consult a healthcare professional
                immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
