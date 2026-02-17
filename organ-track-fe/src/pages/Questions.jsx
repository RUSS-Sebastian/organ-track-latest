import { useNavigate, useParams } from "react-router-dom";
import { useOrgan } from "../context/OrganContext";
import { useEffect, useState } from "react";
// ================= DRAFT EXPIRY CONFIG =================
const DAILY_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

const isDraftExpired = (draft) => {
  if (!draft?.timestamp) return false;
  const now = Date.now();
  return now - draft.timestamp > DAILY_EXPIRY;
};

export default function Questions() {
  const { organId } = useParams();
  const { organ, setOrgan } = useOrgan();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  // URL is now the source of truth
  const isDaily = organId === "daily";
  const isOrgan = organId && organId !== "daily";
  const [answers, setAnswers] = useState({});
  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  const isLastQuestion = currentIndex === questions.length - 1;
  const [restored, setRestored] = useState(false);
  const [showResumeOverlay, setShowResumeOverlay] = useState(false);
  const [pendingDraft, setPendingDraft] = useState(null);

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

  useEffect(() => {
    // Simulated backend
    const fakeDB = {
      Heart: [
        {
          id: 1,
          question: "Do you feel chest pain?",
          options: ["Never", "Sometimes", "Often"],
          multi: false,
        },
        {
          id: 2,
          question: "Do you feel shortness of breath?",
          options: ["No", "Mild", "Severe"],
          multi: false,
        },
        {
          id: 3,
          question: "Do you feel heart palpitations?",
          options: ["No", "Rarely", "Frequently"],
          multi: false,
        },
        {
          id: 4,
          question: "Do you feel dizziness after activity?",
          options: ["Never", "Sometimes", "Often"],
          multi: true,
        },
        {
          id: 5,
          question: "Do you feel tired easily?",
          options: ["No", "Sometimes", "Very often"],
          multi: false,
        },
      ],
      Brain: [
        {
          id: 1,
          question: "Do you get headaches?",
          options: ["Rarely", "Sometimes", "Often"],
          multi: true,
        },
      ],
    };

    const dailyDB = [
      {
        id: 1,
        question: "Did you sleep 7-8 hours?",
        options: ["Yes", "No"],
        multi: false,
      },
      {
        id: 2,
        question: "Did you drink water today?",
        options: ["Yes", "No"],
        multi: false,
      },
      {
        id: 3,
        question: "Did you exercise today?",
        options: ["Yes", "No"],
        multi: false,
      },
    ];

    // ---------------- ORGAN FLOW ----------------
    if (isOrgan) {
      if (!fakeDB[organId]) {
        navigate("/track"); // invalid organ fallback
        return;
      }

      setQuestions(fakeDB[organId] || []);
      return;
    }

    // ---------------- DAILY FLOW ----------------
    if (isDaily) {
      setQuestions(dailyDB);
      return;
    }

    // fallback safety
    navigate("/track");
  }, [organId]);

  const handleSelect = (question, option) => {
    setAnswers((prev) => {
      const currentAnswer = prev[question.id];

      // MULTI SELECT QUESTION
      if (question.multi) {
        const arr = Array.isArray(currentAnswer) ? currentAnswer : [];

        if (arr.includes(option)) {
          // remove option
          return {
            ...prev,
            [question.id]: arr.filter((o) => o !== option),
          };
        } else {
          // add option
          return {
            ...prev,
            [question.id]: [...arr, option],
          };
        }
      }

      // SINGLE SELECT QUESTION
      return {
        ...prev,
        [question.id]: option,
      };
    });
  };

  const handleSubmit = () => {
    // Find first unanswered question
    const firstUnansweredIndex = questions.findIndex((q) => !answers[q.id]);

    if (firstUnansweredIndex !== -1) {
      alert("Please complete all questions first!");
      setCurrentIndex(firstUnansweredIndex);
      return;
    }

    // All answered
    console.log("Submitted answers:", answers);
    // clear draft after submit
    const draftKey = getDraftKey(organId);
    if (draftKey) localStorage.removeItem(draftKey);
    alert("Submitted successfully!"); // wait for user to click OK

    // Redirect after alert
    if (isDaily) {
      navigate("/thanks/daily");
    } else {
      navigate("/thanks/syms");
    }
  };

  const handleResumeDraft = () => {
    if (!pendingDraft) return;

    setAnswers(pendingDraft.answers || {});
    setCurrentIndex(pendingDraft.currentIndex || 0);

    setRestored(true);
    setShowResumeOverlay(false);
  };

  const handleStartFresh = () => {
    const draftKey = getDraftKey(organId);
    localStorage.removeItem(draftKey);

    setAnswers({});
    setCurrentIndex(0);
    setRestored(true);
    setShowResumeOverlay(false);
  };

  // ================= DRAFT KEY BUILDER =================
  const getDraftKey = (organId) => {
    console.log("getDraftKeyCalled");
    if (organId === "daily") return "draft_daily";
    if (organId) return `draft_organ_${organId}`;
    return null;
  };

  useEffect(() => {
    if (questions.length === 0) return;

    const draftKey = getDraftKey(organId);
    if (!draftKey) return;

    const saved = localStorage.getItem(draftKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      // 🧨 PHASE 3: Expire daily drafts BEFORE overlay
      if (organId === "daily") {
        const now = Date.now();
        const DAILY_EXPIRY = 24 * 60 * 60 * 1000;

        if (now - parsed.timestamp > DAILY_EXPIRY) {
          console.log("Daily draft expired → removing");
          localStorage.removeItem(draftKey);
          return;
        }
      }

      // ✅ Only show overlay if valid draft
      setPendingDraft(parsed);
      setShowResumeOverlay(true);
    } catch (e) {
      console.warn("Draft parse failed", e);
    }
  }, [questions, organId]);

  // ================= AUTO SAVE DRAFT =================
  useEffect(() => {
    if (!organId || questions.length === 0) return; // must have organ and questions

    const draftKey = getDraftKey(organId);
    if (!draftKey) return;

    // Only restore draft if exists, but always save current progress
    const draft = {
      organId,
      answers,
      currentIndex,
      version: 1,
      timestamp: Date.now(),
    };

    localStorage.setItem(draftKey, JSON.stringify(draft));
    console.log("Draft saved:", draft);
  }, [answers, currentIndex, organId, questions]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
      {/* 402px centered container */}
      <div className="w-full max-w-[402px] h-[874px] bg-white mx-auto relative overflow-hidden">
        {showResumeOverlay && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-[402px] text-center">
              <h2 className="text-lg font-semibold mb-3">
                Unfinished session found
              </h2>

              <p
                className="text-sm text-gray-600 mb-6"
                style={{ fontFamily: "Roboto" }}
              >
                Do you want to continue where you left off?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleStartFresh}
                  className="flex-1 border rounded-lg py-2"
                  style={{ fontFamily: "Roboto" }}
                >
                  Start Over
                </button>

                <button
                  onClick={handleResumeDraft}
                  className="flex-1 bg-blue-500 text-white rounded-lg py-2"
                  style={{ fontFamily: "Roboto" }}
                >
                  Resume
                </button>
              </div>
            </div>
          </div>
        )}

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
                <h2 className="text-lg font-semibold text-left mb-4">
                  {currentQuestion?.question}
                </h2>

                {currentQuestion.multi && (
                  <p className="text-sm text-gray-500 mb-2">
                    You can select multiple options
                  </p>
                )}

                {/* ================= QUESTION BLOCK INDICATOR ================= */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {questions.map((q, index) => {
                    const isCurrent = currentIndex === index;

                    // 🔥 FIX: use question.id instead of index
                    const isAnswered = answers[q.id] !== undefined;

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          isCurrent ? "w-10" : "w-6"
                        }`}
                        style={{
                          backgroundColor: isAnswered ? "#14AE5C" : "#FDE31E",
                        }}
                      />
                    );
                  })}
                </div>

                <div className="flex flex-col gap-3">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSelected = currentQuestion.multi
                      ? answers[currentQuestion.id]?.includes(opt)
                      : answers[currentQuestion.id] === opt;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(currentQuestion, opt)}
                        className={`py-3 rounded-lg border transition ${
                          isSelected
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
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

            <button
              disabled={!isLastQuestion}
              onClick={handleSubmit}
              className={`mt-4 w-full py-3 rounded-lg text-white
                ${isLastQuestion ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"}
              `}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
