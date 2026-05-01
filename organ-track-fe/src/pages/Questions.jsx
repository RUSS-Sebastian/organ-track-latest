import { useNavigate, useParams } from "react-router-dom";
import { useOrgan } from "../context/OrganContext";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useUser } from "../context/UserContext";

// ---------- Translations ----------
const translations = {
  loadingQuestions: {
    en: "Loading questions...",
    mm: "မေးခွန်းများဖွင့်နေသည်...",
  },
  processingAnswers: {
    en: "Processing your answers...",
    mm: "သင်၏အဖြေများကို လုပ်ဆောင်နေသည်...",
  },
  unfinishedSessionTitle: {
    en: "Unfinished session found",
    mm: "မပြီးဆုံးသေးသော အစီအစဉ်တစ်ခုတွေ့ရှိပါသည်",
  },
  unfinishedSessionMessage: {
    en: "Do you want to continue where you left off?",
    mm: "သင်ရပ်ထားသည့်နေရာမှ ဆက်လုပ်လိုပါသလား။",
  },
  startOver: { en: "Start Over", mm: "အစကနေစမည်" },
  resume: { en: "Resume", mm: "ဆက်လုပ်ရန်" },
  questionNumber: (num) => ({
    en: `Question ${num}`,
    mm: `မေးခွန်း ${num}`,
  }),
  selectMultiple: {
    en: "You can select multiple options",
    mm: "အဖြေများစွာ ရွေးချယ်နိုင်ပါသည်",
  },
  previous: { en: "Previous", mm: "နောက်သို့" },
  next: { en: "Next", mm: "ရှေ့သို့" },
  submit: { en: "Submit", mm: "တင်ပြမည်" },
  pleaseCompleteAll: {
    en: "Please complete all questions first!",
    mm: "မေးခွန်းအားလုံးကို အရင်ဖြေဆိုပါ။",
  },
  submissionFailed: {
    en: "Failed to submit daily report. Please try again.",
    mm: "နေ့စဉ်မှတ်တမ်းတင်ပြရန် မအောင်မြင်ပါ။ ထပ်စမ်းကြည့်ပါ။",
  },
  generalSubmitFailed: {
    en: "Submission failed, please try again.",
    mm: "တင်ပြမှု မအောင်မြင်ပါ၊ ထပ်စမ်းကြည့်ပါ။",
  },
  submittedSuccessfully: {
    en: "Submitted successfully!",
    mm: "အောင်မြင်စွာ တင်ပြပြီးပါပြီ။",
  },
};

export default function Questions() {
  const { user } = useUser();
  const userId = user?.id;
  const initialLang = user?.language_preference === "Bur" ? "mm" : "en";
  const [lang, setLang] = useState(initialLang);
  const isBurmese = lang === "mm"; // local display language, can differ from saved pref
  const t = (en, mm) => (isBurmese ? mm : en);

  const [submitting, setSubmitting] = useState(false);
  const { organId } = useParams();
  const { organ, setOrgan } = useOrgan();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [organName, setOrganName] = useState("");
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
      const numericId = Number(organId);
      if (!isNaN(numericId)) {
        setOrgan(numericId);
      }
    }
  }, [organ, organId]);

  useEffect(() => {
    if (isOrgan) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`/organs/${organId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          });
          setQuestions(response.data.questions);
          setOrganName(response.data.organ_name);
        } catch (error) {
          console.error("Fetch failed", error);
          navigate("/track");
        } finally {
          setLoading(false);
        }
      };
      fetchQuestions();
      return;
    }

    if (isDaily) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`/daily-questions`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          });
          setQuestions(response.data.questions);
        } catch (error) {
          console.error("Fetch failed", error);
          navigate("/checkin");
        } finally {
          setLoading(false);
        }
      };
      fetchQuestions();
      return;
    }

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
          return { ...prev, [question.id]: [...arr, optionId] };
        }
      }

      return { ...prev, [question.id]: optionId };
    });
  };

  const handleSubmit = async () => {
    const firstUnansweredIndex = questions.findIndex((q) => {
      const ans = answers[q.id];
      if (!ans) return true;
      if (q.question_type === "multiple" && ans.length === 0) return true;
      return false;
    });

    if (firstUnansweredIndex !== -1) {
      alert(
        t(translations.pleaseCompleteAll.en, translations.pleaseCompleteAll.mm),
      );
      setCurrentIndex(firstUnansweredIndex);
      return;
    }

    const payload = {
      answers: Object.entries(answers).map(([questionId, optionId]) => ({
        question_id: Number(questionId),
        option_ids: optionId,
      })),
    };

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const payloadWithTimezone = { ...payload, timezone };

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
        const draftKey = getDraftKey(organId);
        if (draftKey) localStorage.removeItem(draftKey);
        alert(
          t(
            translations.submittedSuccessfully.en,
            translations.submittedSuccessfully.mm,
          ),
        );
        navigate("/");
      } catch (err) {
        console.error("Submission failed:", err);
        setSubmitting(false);
        alert(
          t(translations.submissionFailed.en, translations.submissionFailed.mm),
        );
      }
    } else {
      try {
        setSubmitting(true);
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
        const draftKey = getDraftKey(organId);
        if (draftKey) localStorage.removeItem(draftKey);

        alert(
          t(
            translations.submittedSuccessfully.en,
            translations.submittedSuccessfully.mm,
          ),
        );

        let data = response.data;
        if (typeof data === "string") {
          const jsonPart = data.substring(data.indexOf("{"));
          data = JSON.parse(jsonPart);
        }
        const reportIds = data.report_ids || {};
        const reportId = Object.values(reportIds)[0];
        navigate(`/thanks/syms/${reportId}`);
      } catch (error) {
        console.error("Submission failed:", error);
        alert(
          t(
            translations.generalSubmitFailed.en,
            translations.generalSubmitFailed.mm,
          ),
        );
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

  const getDraftKey = (organId) => {
    if (!userId) return null;
    if (organId === "daily") return `draft_daily_user_${userId}`;
    if (organId) return `draft_organ_${organId}_user_${userId}`;
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
      if (isDaily) {
        const draftDate = new Date(parsed.timestamp);
        const today = new Date();
        if (
          draftDate.getFullYear() !== today.getFullYear() ||
          draftDate.getMonth() !== today.getMonth() ||
          draftDate.getDate() !== today.getDate()
        ) {
          localStorage.removeItem(draftKey);
          return;
        }
        if (parsed.userId && parsed.userId !== userId) return;
      }
      if (parsed.answers && Object.keys(parsed.answers).length > 0) {
        setPendingDraft(parsed);
        setShowResumeOverlay(true);
      }
    } catch (e) {
      console.warn("Draft parse failed", e);
    }
  }, [loading, questions, organId, userId]);

  useEffect(() => {
    if (!organId || questions.length === 0) return;
    const draftKey = getDraftKey(organId);
    if (!draftKey) return;

    const hasAnswers =
      answers &&
      Object.keys(answers).length > 0 &&
      Object.values(answers).some((val) => {
        if (Array.isArray(val)) return val.length > 0;
        return val !== null && val !== undefined;
      });

    if (!hasAnswers) {
      localStorage.removeItem(draftKey);
      return;
    }

    const draft = {
      organId,
      organName,
      answers,
      currentIndex,
      version: 1,
      timestamp: Date.now(),
      ...(isDaily && { userId }),
    };

    localStorage.setItem(draftKey, JSON.stringify(draft));
  }, [answers, currentIndex, organId, questions, organName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>
          {t(
            translations.loadingQuestions.en,
            translations.loadingQuestions.mm,
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      {/* Spinner overlay */}
      {submitting && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <div className="loader border-4 border-t-4 border-green-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 animate-spin"></div>
            <p className="mt-4 text-white font-semibold text-sm sm:text-base">
              {t(
                translations.processingAnswers.en,
                translations.processingAnswers.mm,
              )}
            </p>
          </div>
        </div>
      )}

      {/* Resume overlay */}
      {showResumeOverlay && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 sm:p-6 w-full max-w-md text-center shadow-xl">
            <h2
              className={`text-lg sm:text-xl font-semibold mb-3 ${isBurmese ? "leading-relaxed" : ""}`}
            >
              {t(
                translations.unfinishedSessionTitle.en,
                translations.unfinishedSessionTitle.mm,
              )}
            </h2>
            <p
              className="text-sm sm:text-base text-gray-600 mb-6"
              style={{ fontFamily: "Roboto" }}
            >
              {t(
                translations.unfinishedSessionMessage.en,
                translations.unfinishedSessionMessage.mm,
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleStartFresh}
                className="flex-1 border border-gray-300 rounded-lg py-2 sm:py-3 text-sm sm:text-base font-medium"
                style={{ fontFamily: "Roboto" }}
              >
                {t(translations.startOver.en, translations.startOver.mm)}
              </button>
              <button
                onClick={handleResumeDraft}
                className="flex-1 bg-blue-500 text-white rounded-lg py-2 sm:py-3 text-sm sm:text-base font-medium"
                style={{ fontFamily: "Roboto" }}
              >
                {t(translations.resume.en, translations.resume.mm)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Green top container */}
      <div className="w-full bg-[#14AE5C] relative flex justify-center pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20 px-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 w-9 h-9 sm:w-10 sm:h-10 bg-[#1BB137] rounded-lg flex items-center justify-center shadow-md active:scale-95 transition"
        >
          <span className="text-white text-lg sm:text-xl font-bold">{"<"}</span>
        </button>
        <h1 className="text-white font-['Roboto'] font-bold text-xl sm:text-2xl lg:text-3xl text-center leading-tight">
          {organName}
        </h1>
      </div>

      {/* Floating question card */}
      <div className="w-full px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-10 max-w-2xl mx-auto">
        <div className="bg-[#E3FEE8] rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6">
          {currentQuestion && (
            <div>
              <h1 className="text-lg sm:text-xl font-bold mb-4">
                {t(
                  translations.questionNumber(currentIndex + 1).en,
                  translations.questionNumber(currentIndex + 1).mm,
                )}
              </h1>

              {/* LANGUAGE TOGGLE */}
              <div className="flex items-center gap-3 mb-4 justify-start">
                <span
                  className={`font-semibold text-sm sm:text-base ${
                    lang === "en" ? "text-white" : "text-gray-500"
                  }`}
                >
                  EN
                </span>
                <button
                  onClick={() => setLang(lang === "en" ? "mm" : "en")}
                  className={`relative w-12 h-6 sm:w-16 sm:h-8 rounded-full transition-colors duration-300 focus:outline-none ${
                    lang === "en" ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 sm:w-7 sm:h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      lang === "mm" ? "translate-x-6 sm:translate-x-8" : ""
                    }`}
                  />
                </button>
                <span
                  className={`font-semibold text-sm sm:text-base ${
                    lang === "mm" ? "text-white" : "text-gray-500"
                  }`}
                >
                  MM
                </span>
              </div>

              {/* Question text */}
              <h2
                className={`text-base sm:text-lg font-semibold text-left mb-4 ${isBurmese ? "leading-relaxed" : ""}`}
              >
                {isBurmese
                  ? currentQuestion.question_text_mm
                  : currentQuestion.question_text_en}
              </h2>

              {currentQuestion.question_type === "multiple" && (
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  {t(
                    translations.selectMultiple.en,
                    translations.selectMultiple.mm,
                  )}
                </p>
              )}

              {/* Question block indicator */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {questions.map((question, index) => {
                  const isCurrent = currentIndex === index;
                  const isAnswered = answers[question.id] !== undefined;
                  return (
                    <button
                      key={question.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isCurrent ? "w-8 sm:w-10" : "w-5 sm:w-6"
                      }`}
                      style={{
                        backgroundColor: isAnswered ? "#14AE5C" : "#FDE31E",
                      }}
                    />
                  );
                })}
              </div>

              {/* Options */}
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
                      className={`py-3 rounded-lg border transition text-sm sm:text-base ${
                        isSelected
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {isBurmese ? opt.option_text_mm : opt.option_text_en}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6 gap-3">
            <button
              onClick={goPrev}
              disabled={isFirst}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base flex-1 ${
                isFirst ? "bg-gray-200 text-gray-400" : "bg-white shadow"
              }`}
            >
              {t(translations.previous.en, translations.previous.mm)}
            </button>
            <button
              onClick={goNext}
              disabled={isLast}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base flex-1 ${
                isLast ? "bg-gray-200 text-gray-400" : "bg-[#354CDF] text-white"
              }`}
            >
              {t(translations.next.en, translations.next.mm)}
            </button>
          </div>

          <button
            disabled={!isLastQuestion}
            onClick={handleSubmit}
            className={`mt-4 w-full py-3 rounded-lg text-white text-sm sm:text-base font-semibold ${
              isLastQuestion ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {t(translations.submit.en, translations.submit.mm)}
          </button>
        </div>
      </div>
    </div>
  );
}
