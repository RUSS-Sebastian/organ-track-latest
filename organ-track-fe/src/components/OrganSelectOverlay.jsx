import { useState } from "react";
import { useUser } from "../context/UserContext";
import { organs } from "../data/organ";
import { useNavigate } from "react-router-dom";
import { useOrgan } from "../context/OrganContext";

// --- Burmese organ name mapping ---
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

// --- Static UI translations ---
const translations = {
  prompt: {
    en: "Select one of these organs you think your symptom is related to",
    mm: "သင့်ရောဂါလက္ခဏာနှင့် သက်ဆိုင်သည်ဟုထင်သော ကိုယ်အင်္ဂါတစ်ခုကို ရွေးချယ်ပါ",
  },
  placeholder: { en: "Choose an organ", mm: "ကိုယ်အင်္ဂါရွေးပါ" },
  cancel: { en: "Cancel", mm: "မလုပ်တော့" },
  answer: { en: "Answer", mm: "ဖြေဆိုမည်" },
};

export default function OrganSelectOverlay({ onClose }) {
  // FIXED: destructure to get the actual user object
  const { user } = useUser();
  const isBurmese = user?.language_preference === "Bur";

  const [selectedOrgan, setSelectedOrgan] = useState("");
  const navigate = useNavigate();
  const { setOrgan } = useOrgan();

  // Build gender-based organ list
  const organList = [
    ...organs.common,
    ...(user?.gender === "male" ? organs.male : organs.female),
  ];

  const handleAnswer = () => {
    if (!selectedOrgan) {
      alert(
        isBurmese
          ? "ကျေးဇူးပြု၍ ကိုယ်အင်္ဂါတစ်ခုကို အရင်ရွေးချယ်ပါ။"
          : "Please select an organ first.",
      );
      return;
    }
    setOrgan(selectedOrgan);
    navigate(`/questions/${selectedOrgan}`);
    onClose();
  };

  const t = (en, mm) => (isBurmese ? mm : en);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-2xl shadow-lg p-4 sm:p-5">
        {/* Prompt */}
        <p
          className={`text-[#14AE5C] font-semibold font-['Montserrat'] text-sm sm:text-base lg:text-lg text-left ${
            isBurmese ? "leading-relaxed" : ""
          }`}
        >
          {t(translations.prompt.en, translations.prompt.mm)}
        </p>

        {/* Dropdown */}
        <select
          className="mt-3 sm:mt-4 w-full border border-gray-300 rounded-xl px-3 py-2.5 sm:py-3 font-['Montserrat'] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#14AE5C]"
          value={selectedOrgan}
          onChange={(e) => setSelectedOrgan(e.target.value)}
        >
          <option value="">
            {t(translations.placeholder.en, translations.placeholder.mm)}
          </option>
          {organList.map((organ) => (
            <option key={organ.id} value={organ.id}>
              {isBurmese ? organNameMM[organ.name] || organ.name : organ.name}
            </option>
          ))}
        </select>

        {/* Buttons Row */}
        <div className="mt-4 sm:mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 sm:h-12 border-2 border-[#14AE5C] text-[#14AE5C] bg-white rounded-[30px] font-semibold font-['Montserrat'] text-sm sm:text-base"
          >
            {t(translations.cancel.en, translations.cancel.mm)}
          </button>
          <button
            onClick={handleAnswer}
            className="flex-1 h-11 sm:h-12 bg-[#14AE5C] text-white rounded-[30px] font-semibold font-['Montserrat'] text-sm sm:text-base"
          >
            {t(translations.answer.en, translations.answer.mm)}
          </button>
        </div>
      </div>
    </div>
  );
}
