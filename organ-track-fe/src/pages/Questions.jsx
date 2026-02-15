import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useOrgan } from "../context/OrganContext";
import { useEffect, useState } from "react";

export default function Questions() {
  const { organId } = useParams();
  const { organ, setOrgan } = useOrgan();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { type, organId: organFromState } = location.state || {};
  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Restore organ if refreshed
  useEffect(() => {
    if (!organ && organId) {
      setOrgan(organId);
    }
  }, []);

  // Simulated backend
  useEffect(() => {
    // Scenario: Organ symptom tracking
    if (type === "organ") {
      const id = organFromState || organId;
      if (!id) return;

      // restore context if refresh
      if (!organ) setOrgan(id);

      // Simulated backend
      const fakeDB = {
        Heart: [
          {
            id: 1,
            question: "Do you feel chest pain?",
            options: ["Never", "Sometimes", "Often"],
          },
          {
            id: 2,
            question: "Do you feel shortness of breath?",
            options: ["No", "Mild", "Severe"],
          },
          {
            id: 3,
            question: "Do you feel heart palpitations?",
            options: ["No", "Rarely", "Frequently"],
          },
          {
            id: 4,
            question: "Do you feel dizziness after activity?",
            options: ["Never", "Sometimes", "Often"],
          },
          {
            id: 5,
            question: "Do you feel tired easily?",
            options: ["No", "Sometimes", "Very often"],
          },
        ],
        Brain: [{ q: "Headache?", options: ["Mild", "Severe"] }],
      };
      setQuestions(fakeDB[id] || []);
    }

    // Scenario: Daily habit check-in
    if (type === "daily") {
      const dailyDB = [
        { q: "Did you sleep 7-8 hours?", options: ["Yes", "No"] },
        { q: "Did you drink water today?", options: ["Yes", "No"] },
        { q: "Did you exercise today?", options: ["Yes", "No"] },
      ];
      setQuestions(dailyDB);
    }
  }, [type, organFromState, organId]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [questions]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
      {/* 402px centered container */}
      <div className="w-full max-w-[402px] h-[874px] bg-white mx-auto relative overflow-hidden">
        {/* ================= GREEN TOP CONTAINER ================= */}
        <div className="w-full h-[206px] bg-[#14AE5C] relative flex justify-center">
          {/* Inner content wrapper to keep mobile width */}
          <div className="w-full max-w-[402px] px-4 relative h-full">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-6 left-4 w-[36px] h-[36px] bg-[#1BB137] rounded-lg flex items-center justify-center shadow-md active:scale-95 transition"
            >
              <span className="text-white text-lg font-bold">{"<"}</span>
            </button>

            {/* Header Text */}
            <h1 className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-['Roboto'] font-bold text-[24px] text-center">
              {organId}
            </h1>
          </div>
        </div>

        {/* ================= FLOATING QUESTION CARD ================= */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[90px] w-[340px] h-[702px] bg-[#E3FEE8] rounded-[20px] shadow-lg p-4">
          {/* Your questions content goes here */}
          {/* YOUR EXISTING QUESTIONS UI HERE */}
          <div className="p-5">
            {currentQuestion && (
              <div>
                <h1 className="text-xl font-bold mb-4">
                  Question {currentQuestion.id}
                </h1>

                {/* Question text */}
                <h2 className="text-lg font-semibold mb-4">
                  {currentQuestion.question || currentQuestion.q}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {(currentQuestion.options || []).map((opt, idx) => (
                    <button
                      key={idx}
                      className="w-full p-3 bg-white rounded-lg border border-gray-200 text-left"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {/* Previous */}
              <button
                onClick={goPrev}
                disabled={isFirst}
                className={`px-4 py-2 rounded-lg ${
                  isFirst ? "bg-gray-200 text-gray-400" : "bg-white shadow"
                }`}
              >
                Previous
              </button>

              {/* Next */}
              <button
                onClick={goNext}
                disabled={isLast}
                className={`px-4 py-2 rounded-lg ${
                  isLast
                    ? "bg-gray-200 text-gray-400"
                    : "bg-[#354CDF] text-white"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
