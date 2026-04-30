import { useState, useEffect } from "react";
import ConditionBadge from "../components/ConditionBadge";
import { useNavigate } from "react-router-dom";
import organImages from "../data/organImages";
import { organs } from "../data/organ";
import { useUser } from "../context/UserContext";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../api/axios";

// --- Translations ---
const translations = {
  greeting: {
    "Good Morning": "မင်္ဂလာရှိသော နံနက်ခင်းပါ",
    "Good Afternoon": "မင်္ဂလာရှိသော နေ့လယ်ခင်းလေးဖြစ်ပါစေ",
    "Good Evening": "မင်္ဂလာရှိသော ညနေခင်းလေးဖြစ်ပါစေ",
    "Good Night": "ကောင်းသော ညချမ်းလေးဖြစ်ပါစေ",
  },
  subtitle: {
    en: "Track today’s habits and see how they affect your organs.",
    mm: "ယနေ့ပြုလုပ်သည့် အလေ့အကျင့်များကို မှတ်တမ်းတင်ပြီး ၎င်းတို့က သင့်ကိုယ်တွင်းအင်္ဂါများကို မည်သို့သက်ရောက်မှုရှိသည်ကို ကြည့်ရှုလိုက်ပါ။",
  },
  sectionTitle: {
    en: "Your Organ Health Overview",
    mm: "သင့်ကိုယ်တွင်းအင်္ဂါများ၏ ကျန်းမာရေးအခြေအနေ",
  },
  status: {
    Good: "ကောင်းမွန်",
    Moderate: "ပုံမှန်",
    "Needs Attention": "သတိထားရန်လိုအပ်",
  },
  noData: {
    title: {
      en: "There is no data to show.",
      mm: "ပြသရန် အချက်အလက်မရှိပါ။",
    },
    subtitle: {
      en: "Go to Check-in section and answer first to check your first data.",
      mm: "စစ်ဆေးမှု အပိုင်းသို့သွား၍ သင်၏ ပထမဆုံး အချက်အလက်များကို စစ်ဆေးပါ။",
    },
  },
};

const organNameMM = {
  Heart: "နှလုံး",
  Brain: "ဦးနှောက်",
  Lungs: "အဆုတ်",
  Liver: "အသည်း",
  Kidneys: "ကျောက်ကပ်",
  Stomach: "အစာအိမ်",
  Muscles: "ကြွက်သားများ",
  Intestine: "အူ",
  Gallbladder: "သည်းခြေအိတ်",
  Pancreas: "ပန်ကရိယ",
  Skin: "အရေပြား",
  Bladder: "ဆီးအိတ်",
  Bloodvessels: "သွေးကြောများ",
  Bone: "အရိုး",
  Prostate: "ဆီးကျိတ်",
  Uterus: "သားအိမ်",
};

export default function Home() {
  const navigate = useNavigate();
  const [user1, setUser] = useState(null);
  const { user } = useUser(); // authenticated user (with language_preference)
  const [loading, setLoading] = useState(true);

  const isBurmese = user?.language_preference === "Bur";
  const t = (en, mm) => (isBurmese ? mm : en);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/latest-organ-status", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching organ status:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    let enGreeting;
    if (hour >= 6 && hour < 12) enGreeting = "Good Morning";
    else if (hour >= 12 && hour < 16) enGreeting = "Good Afternoon";
    else if (hour >= 16 && hour < 20) enGreeting = "Good Evening";
    else enGreeting = "Good Night";

    return isBurmese ? translations.greeting[enGreeting] : enGreeting;
  };

  const organStatuses = user1?.organHealth
    ? Object.values(user1.organHealth)
        .filter((organ) => organ !== null)
        .map((organ) => organ.status)
    : [];

  const goodCount = organStatuses.filter((s) => s === "Good").length;
  const moderateCount = organStatuses.filter((s) => s === "Moderate").length;
  const needsAttentionCount = organStatuses.filter(
    (s) => s === "Needs Attention",
  ).length;

  const organEntries = user1?.organHealth
    ? Object.entries(user1.organHealth).filter(([key, value]) => value !== null)
    : [];

  const normalize = (str) => str.replace(/\s+/g, "").toLowerCase();

  const findOrganId = (name) => {
    const allOrgans = [...organs.common, ...organs.male, ...organs.female];
    const organObj = allOrgans.find(
      (o) => normalize(o.name) === normalize(name),
    );
    return organObj?.id ?? null;
  };

  const toCamelCase = (str) => {
    return str
      .replace(/\s(.)/g, (_, group1) => group1.toUpperCase())
      .replace(/\s/g, "")
      .replace(/^(.)/, (_, group1) => group1.toLowerCase());
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/50 flex items-center justify-center">
          <ClipLoader color="#4DD880" size={80} />
        </div>
      )}

      <div className="flex-1 overflow-auto w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 space-y-6">
          {/* Greeting */}
          <p className="text-left text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-roboto font-semibold">
            {getGreeting()}!{" "}
            <span className="font-bold text-[#4DD880]">{user?.name}</span>
          </p>

          {/* Subtitle */}
          <p className="text-left text-sm sm:text-base lg:text-xl xl:text-2xl font-normal">
            {t(translations.subtitle.en, translations.subtitle.mm)}
          </p>

          {/* Section Title */}
          <p className="text-center text-base sm:text-lg lg:text-2xl xl:text-3xl font-semibold mt-6">
            {t(translations.sectionTitle.en, translations.sectionTitle.mm)}
          </p>

          {/* Condition Summary with labels */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 mt-6">
            {[
              {
                color: "bg-[#2DF251]",
                count: goodCount,
                statusKey: "Good",
              },
              {
                color: "bg-[#FDE31E]",
                count: moderateCount,
                statusKey: "Moderate",
              },
              {
                color: "bg-[#ED0C05]",
                count: needsAttentionCount,
                statusKey: "Needs Attention",
              },
            ].map(({ color, count, statusKey }) => (
              <div key={color} className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full ${color}`}
                />
                <p className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium">
                  {isBurmese
                    ? `${translations.status[statusKey]} (${count})`
                    : `${statusKey} (${count})`}
                </p>
              </div>
            ))}
          </div>

          {/* Organ Data or No-Data Message */}
          {!loading && user1 && organEntries.length === 0 ? (
            <div className="text-center mt-12 px-4">
              <p
                className="font-medium text-gray-600"
                style={{ fontSize: "clamp(1.125rem, 4vw, 2rem)" }}
              >
                {t(translations.noData.title.en, translations.noData.title.mm)}
              </p>
              <p
                className="mt-2 text-gray-500"
                style={{ fontSize: "clamp(0.875rem, 3vw, 1.25rem)" }}
              >
                {t(
                  translations.noData.subtitle.en,
                  translations.noData.subtitle.mm,
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mt-8">
              {organEntries.map(([organName, organData]) => {
                const organId = findOrganId(organName);
                const displayOrganName = isBurmese
                  ? organNameMM[organName] || organName
                  : organName;

                return (
                  <div
                    key={organName}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => {
                      if (organId) navigate(`/each-organ/${organId}`);
                    }}
                  >
                    <div className="w-full aspect-square bg-[#1E1B39] flex items-center justify-center rounded-xl border border-yellow-500">
                      <img
                        src={organImages[toCamelCase(organName)]}
                        alt={displayOrganName}
                        className="w-4/5 h-4/5 object-contain"
                      />
                    </div>
                    <div className="mt-3">
                      <ConditionBadge
                        status={organData.status}
                        displayLabel={
                          isBurmese
                            ? translations.status[organData.status] ||
                              organData.status
                            : organData.status
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
