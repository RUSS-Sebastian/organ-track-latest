import { useNavigate, useParams } from "react-router-dom";
import { useOrgan } from "../context/OrganContext";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useUser } from "../context/UserContext";

export default function Questions() {
  const { user } = useUser();
  const userId = user?.id; // will be undefined until user is loaded
  const [submitting, setSubmitting] = useState(false);
  const [lang, setLang] = useState("en"); // "en" for English, "mm" for Myanmar
  const { organId } = useParams();
  const { organ, setOrgan } = useOrgan();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [organName, setOrganName] = useState("");
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
  const [loading, setLoading] = useState(true);

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
      const numericId = Number(organId); // convert string from URL to number
      if (!isNaN(numericId)) {
        setOrgan(numericId);
      }
    }
  }, [organ, organId]);

  useEffect(() => {
    // ---------------- ORGAN FLOW ----------------
    if (isOrgan) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`/organs/${organId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          });

          setQuestions(response.data.questions); // 👈 store raw backend format
          setOrganName(response.data.organ_name);
        } catch (error) {
          console.error("Fetch failed", error);
          navigate("/track");
        } finally {
          setLoading(false); // ✅ stop loading after fetch
        }
      };

      fetchQuestions();
      return;
    }

    // ---------------- DAILY FLOW ----------------
    if (isDaily) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`/daily-questions`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          });

          setQuestions(response.data.questions); // 👈 store raw backend format
        } catch (error) {
          console.error("Fetch failed", error);
          navigate("/checkin");
        } finally {
          setLoading(false); // ✅ stop loading after fetch
        }
      };

      fetchQuestions();
      return;
    }

    // fallback safety
    navigate("/");
  }, [organId]);

  const handleSelect = (question, optionId) => {
    setAnswers((prev) => {
      const currentAnswer = prev[question.id];

      if (question.question_type === "multiple") {
        const arr = Array.isArray(currentAnswer) ? currentAnswer : [];

        if (arr.includes(optionId)) {
          return {
            ...prev,
            [question.id]: arr.filter((id) => id !== optionId),
          };
        } else {
          return {
            ...prev,
            [question.id]: [...arr, optionId],
          };
        }
      }

      return {
        ...prev,
        [question.id]: optionId,
      };
    });
  };

  const handleSubmit = async () => {
    // --- 1. Check for unanswered questions ---
    const firstUnansweredIndex = questions.findIndex((q) => {
      const ans = answers[q.id];
      if (!ans) return true; // nothing selected
      if (q.question_type === "multiple" && ans.length === 0) return true; // empty array
      return false; // answered
    });

    if (firstUnansweredIndex !== -1) {
      alert("Please complete all questions first!");
      setCurrentIndex(firstUnansweredIndex);
      return;
    }

    // --- 2. Transform state into backend format ---
    const payload = {
      answers: Object.entries(answers).map(([questionId, optionId]) => ({
        question_id: Number(questionId),
        option_ids: optionId, // single choice only
      })),
    };

    // Detect current timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // e.g., "Asia/Yangon"

    // Include it in your payload
    const payloadWithTimezone = {
      ...payload, // existing answers etc.
      timezone, // add timezone here
    };

    console.log("Submitting payload:", payload);

    if (isDaily) {
      try {
        setSubmitting(true);

        const response = await axios.post(
          "/submit-daily",
          payloadWithTimezone,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          },
        );

        console.log("API response:", response.data);
        const draftKey = getDraftKey(organId); // make sure draft key is user-specific
        if (draftKey) localStorage.removeItem(draftKey);
        alert("Submitted successfully!");
        navigate("/");
      } catch (err) {
        console.error("Submission failed:", err);
        setSubmitting(false);
        alert("Failed to submit daily report. Please try again.");
      }
    } else {
      try {
        setSubmitting(true); // <--- Show spinner overlay
        // --- 3. Send to backend ---
        const response = await axios.post(
          "/submit-and-generate-report",
          payloadWithTimezone,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          },
        );
        console.log("API response:", response.data);
        // --- 4. Clear saved draft ---
        const draftKey = getDraftKey(organId);
        if (draftKey) localStorage.removeItem(draftKey);

        alert("Submitted successfully!"); // wait for user to click OK

        let data = response.data;

        // If response is a string with extra text, extract JSON part
        if (typeof data === "string") {
          const jsonPart = data.substring(data.indexOf("{"));
          data = JSON.parse(jsonPart);
        }

        const reportIds = data.report_ids || {};
        const reportId = Object.values(reportIds)[0];
        console.log("Extracted reportId:", reportId);
        navigate(`/thanks/syms/${reportId}`);
      } catch (error) {
        console.error("Submission failed:", error);
        alert("Submission failed, please try again.");
      } finally {
        setSubmitting(false);
      }
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
    if (!userId) return null; // safety

    if (organId === "daily") return `draft_daily_user_${userId}`; // already user-specific
    if (organId) return `draft_organ_${organId}_user_${userId}`; // ✅ make symptom draft user-specific

    return null;
  };

  useEffect(() => {
    if (loading || questions.length === 0 || !userId) return;

    const draftKey = getDraftKey(organId);
    if (!draftKey) return;

    const saved = localStorage.getItem(draftKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      // --- DAILY: check expiration ---
      if (isDaily) {
        const draftDate = new Date(parsed.timestamp);
        const today = new Date();

        if (
          draftDate.getFullYear() !== today.getFullYear() ||
          draftDate.getMonth() !== today.getMonth() ||
          draftDate.getDate() !== today.getDate()
        ) {
          // expired → remove
          localStorage.removeItem(draftKey);
          return;
        }

        // ✅ Only show overlay if this draft belongs to current user
        if (parsed.userId && parsed.userId !== userId) return;
      }

      // Show resume overlay if there are answers
      if (parsed.answers && Object.keys(parsed.answers).length > 0) {
        setPendingDraft(parsed);
        setShowResumeOverlay(true);
      }
    } catch (e) {
      console.warn("Draft parse failed", e);
    }
  }, [loading, questions, organId, userId]);
  // ================= AUTO SAVE DRAFT =================
  useEffect(() => {
    if (!organId || questions.length === 0) return;

    const draftKey = getDraftKey(organId);
    if (!draftKey) return;

    // Only save draft if user answered at least one question
    const hasAnswers =
      answers &&
      Object.keys(answers).length > 0 &&
      Object.values(answers).some((val) => {
        if (Array.isArray(val)) return val.length > 0; // multiple choice
        return val !== null && val !== undefined; // single choice
      });

    if (!hasAnswers) {
      localStorage.removeItem(draftKey); // clear empty draft
      return;
    }

    const draft = {
      organId,
      organName,
      answers,
      currentIndex,
      version: 1,
      timestamp: Date.now(),
      ...(isDaily && { userId }), // ✅ include userId only for daily
    };

    localStorage.setItem(draftKey, JSON.stringify(draft));
  }, [answers, currentIndex, organId, questions, organName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
      {/* --- Spinner overlay --- */}
      {submitting && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="loader border-4 border-t-4 border-green-500 rounded-full w-16 h-16 animate-spin"></div>
            <p className="mt-4 text-white font-semibold">
              Processing your answers...
            </p>
          </div>
        </div>
      )}
      {/* 402px centered container */}
      <div className="w-full max-w-[402px] h-[880px] bg-white mx-auto relative overflow-hidden">
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
              {organName}
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
                  Question {currentIndex + 1} {/* Using index for numbering */}
                </h1>

                {/* ================= LANGUAGE TOGGLE ================= */}
                <div className="flex items-center gap-3 mb-4 justify-start">
                  {/* EN Label */}
                  <span
                    className={`font-semibold ${
                      lang === "en" ? "text-white" : "text-gray-500"
                    }`}
                  >
                    EN
                  </span>

                  {/* Switch */}
                  <button
                    onClick={() => setLang(lang === "en" ? "mm" : "en")}
                    className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${
                      lang === "en" ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        lang === "mm" ? "translate-x-8" : ""
                      }`}
                    />
                  </button>

                  {/* MM Label */}
                  <span
                    className={`font-semibold ${
                      lang === "mm" ? "text-white" : "text-gray-500"
                    }`}
                  >
                    MM
                  </span>
                </div>

                {/* Question text */}
                <h2 className="text-md font-semibold text-left mb-4">
                  {lang === "en"
                    ? currentQuestion.question_text_en
                    : currentQuestion.question_text_mm}
                </h2>

                {currentQuestion.question_type === "multiple" && (
                  <p className="text-sm text-gray-500 mb-2">
                    You can select multiple options
                  </p>
                )}

                {/* ================= QUESTION BLOCK INDICATOR ================= */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {questions.map((question, index) => {
                    const isCurrent = currentIndex === index;

                    const isAnswered = answers[question.id] !== undefined;

                    return (
                      <button
                        key={question.id}
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
                  {currentQuestion.options.map((opt) => {
                    const isMultiple =
                      currentQuestion.question_type === "multiple";
                    const isSelected = isMultiple
                      ? Array.isArray(answers[currentQuestion.id]) &&
                        answers[currentQuestion.id].includes(opt.id)
                      : answers[currentQuestion.id] === opt.id;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(currentQuestion, opt.id)}
                        className={`py-3 rounded-lg border transition ${
                          isSelected
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {lang === "en"
                          ? opt.option_text_en
                          : opt.option_text_mm}
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
