import TrackHistory from "../components/TrackHistory";
import OrganSelectOverlay from "../components/OrganSelectOverlay";
import { useState, useEffect } from "react";
import { getUserDrafts, deleteDraft } from "../utils/draftStorage";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

// Organ name Burmese translation (reuse or define locally)
const organNameMM = {
  Heart: "နှလုံး",
  Brain: "ဦးနှောက်",
  Lungs: "အဆုတ်",
  Liver: "အသည်း",
  Kidney: "ကျောက်ကပ်",
  Stomach: "အစာအိမ်",
  Muscles: "ကြွက်သားများ",
  Intestine: "အူ",
  "Gall Bladder": "သည်းခြေအိတ်",
  Pancreas: "ပန်ကရိယ",
  Skin: "အရေပြား",
  Bladder: "ဆီးအိတ်",
  "Blood Vessels": "သွေးကြောများ",
  Bone: "အရိုး",
  Prostate: "ဆီးကျိတ်",
  Uterus: "သားအိမ်",
};

// Translations for static UI text
const translations = {
  header: { en: "Symptom Track", mm: "ရောဂါလက္ခဏာ မှတ်တမ်းတင်ခြင်း" },
  subtitle: {
    en: "Don’t feel well today?",
    mm: "ဒီနေ့ နေမကောင်းဖြစ်နေပါသလား?",
  },
  helperText: {
    en: "Select the organ you think that is related to and answer the questions",
    mm: "သင့်စိတ်ထဲထင့်​နေ​သော ကိုယ်အင်္ဂါကိုရွေးချယ်ပြီး မေးခွန်းများဖြေဆိုပါ",
  },
  answerNow: { en: "Answer Now", mm: "ဖြေဆိုရန်" },
  noDraftsTitle: {
    en: "No in-progress drafts",
    mm: "သိမ်းဆည်းထားသော လုပ်ဆောင်ဆဲမှတ်တမ်းများ မရှိပါ",
  },
  noDraftsSubtitle: {
    en: "Start a check-in and it will appear here",
    mm: "မှတ်တမ်းတစ်ခု စတင်လိုက်ပါ၊ ၎င်းကို ဤနေရာတွင် ပြသပေးမည်ဖြစ်ပါသည်",
  },
  resume: { en: "Resume", mm: "ဆက်လုပ်ရန်" },
  delete: { en: "Delete", mm: "ဖျက်မည်" },
  trackHistoryTitle: { en: "Track History", mm: "မှတ်တမ်းကြည့်ရန်" },
};

export default function TrackSyms() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);
  const { user } = useUser();
  const userId = user?.id;
  const isBurmese = user?.language_preference === "Bur";

  useEffect(() => {
    if (!userId) return;
    setDrafts(getUserDrafts(userId));
  }, [userId]);

  const handleDelete = (organId) => {
    if (!userId) return;
    deleteDraft(organId, userId);
    setDrafts(getUserDrafts(userId));
  };

  const handleResume = (organId) => {
    navigate(`/questions/${encodeURIComponent(organId)}`);
  };

  const t = (en, mm) => (isBurmese ? mm : en);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        {/* Header */}
        <h1
          className={`text-[#14AE5C] font-bold text-2xl sm:text-3xl lg:text-4xl font-['Roboto'] ${
            isBurmese ? "leading-relaxed py-1" : ""
          }`}
        >
          {t(translations.header.en, translations.header.mm)}
        </h1>

        {/* Subtitle */}
        <p className="mt-1 text-black text-sm sm:text-base lg:text-lg font-medium font-['Montserrat']">
          {t(translations.subtitle.en, translations.subtitle.mm)}
        </p>

        {/* Helper text */}
        <p className="mt-1 text-black text-sm sm:text-base lg:text-lg font-medium font-['Montserrat']">
          {t(translations.helperText.en, translations.helperText.mm)}
        </p>

        {/* Answer Now button */}
        <button
          className="mt-4 px-6 py-3 bg-[#14AE5C] text-white rounded-xl font-semibold text-sm sm:text-base w-full sm:w-auto transition-all hover:bg-green-700"
          onClick={() => setShowOverlay(true)}
        >
          {t(translations.answerNow.en, translations.answerNow.mm)}
        </button>

        {/* Drafts section */}
        <div className="mt-8">
          {drafts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
              <p className="text-lg sm:text-xl font-medium">
                {t(
                  translations.noDraftsTitle.en,
                  translations.noDraftsTitle.mm,
                )}
              </p>
              <p className="text-sm sm:text-base mt-1">
                {t(
                  translations.noDraftsSubtitle.en,
                  translations.noDraftsSubtitle.mm,
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {drafts.map((draft) => (
                <div
                  key={draft.organId}
                  className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col"
                >
                  <h3 className="font-semibold text-base sm:text-lg mb-3">
                    {isBurmese
                      ? organNameMM[draft.organName] || draft.organName
                      : draft.organName}
                  </h3>

                  <div className="flex flex-col gap-2 mt-auto">
                    <button
                      onClick={() => handleResume(draft.organId)}
                      className="bg-[#14AE5C] text-white rounded-md py-2 text-sm sm:text-base"
                    >
                      {t(translations.resume.en, translations.resume.mm)}
                    </button>

                    <button
                      onClick={() => handleDelete(draft.organId)}
                      className="border border-gray-300 rounded-md py-2 text-sm sm:text-base"
                    >
                      {t(translations.delete.en, translations.delete.mm)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Track History title */}
        <h2
          className={`mt-8 text-[#14AE5C] font-bold text-xl sm:text-2xl lg:text-3xl font-['Montserrat'] text-left ${
            isBurmese ? "leading-relaxed py-1" : ""
          }`}
        >
          {t(
            translations.trackHistoryTitle.en,
            translations.trackHistoryTitle.mm,
          )}
        </h2>

        {/* Track History content */}
        <div className="w-full mt-2">
          <TrackHistory />
        </div>
      </div>

      {showOverlay && (
        <OrganSelectOverlay onClose={() => setShowOverlay(false)} />
      )}
    </div>
  );
}
