import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Terms() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const formData = location.state?.formData ?? {};
  const fromRegister = location.state?.from === "register";

  // Determine language:
  // 1. from Register page (passed via state)
  // 2. from logged-in user's preference
  // 3. default to English
  const lang =
    location.state?.lang || (user?.language_preference === "Bur" ? "my" : "en");

  // ---------- Translations ----------
  const t = {
    agreement: { en: "AGREEMENT", my: "သဘောတူညီချက်" },
    title: { en: "Terms of Service", my: "ဝန်ဆောင်မှုစည်းမျဉ်းများ" },

    sec1Title: { en: "1. Terms", my: "၁. စည်းကမ်းချက်များ" },
    sec1Text: {
      en: "By registering, logging in, or using Organ Track, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. If you do not agree with any part of these terms, you must not use the system.",
      my: "Organ Track တွင် မှတ်ပုံတင်ခြင်း၊ အကောင့်ဝင်ခြင်း သို့မဟုတ် အသုံးပြုခြင်းဖြင့် ဤစည်းကမ်းချက်များကို ဖတ်ရှုပြီး နားလည်ကာ သဘောတူကြောင်း အသိအမှတ်ပြုသည်။ ဤစည်းကမ်းချက်များထဲမှ တစ်စိတ်တစ်ပိုင်းကို သဘောမတူပါက စနစ်ကို အသုံးမပြုရပါ။",
    },

    sec2Title: { en: "2. Purpose of the System", my: "၂. စနစ်၏ ရည်ရွယ်ချက်" },
    sec2Text: {
      en: "Organ Track is a health habit and symptom tracking system designed to help users:",
      my: "Organ Track သည် အသုံးပြုသူများအား ကူညီရန် ဒီဇိုင်းထုတ်ထားသော ကျန်းမာရေးအလေ့အထနှင့် ရောဂါလက္ခဏာခြေရာခံစနစ်ဖြစ်သည်-",
    },
    sec2Item1: {
      en: "Track daily habits and lifestyle choices",
      my: "နေ့စဉ်အလေ့အထများနှင့် ဘဝနေထိုင်မှုပုံစံရွေးချယ်မှုများကို ခြေရာခံပါ",
    },
    sec2Item2: {
      en: "Monitor symptoms related to specific organs",
      my: "သက်ဆိုင်ရာ အင်္ဂါအစိတ်အပိုင်းများနှင့် ဆက်စပ်သော ရောဂါလက္ခဏာများကို စောင့်ကြည့်ပါ",
    },
    sec2Item3: {
      en: "View health insights, trends, and summaries",
      my: "ကျန်းမာရေးဆိုင်ရာ ထိုးထွင်းသိမြင်မှုများ၊ လမ်းကြောင်းများနှင့် အကျဉ်းချုပ်များကို ကြည့်ရှုပါ",
    },
    sec2Warning: {
      en: "⚠️ Organ Track is not a medical diagnosis tool and does not replace professional medical advice.",
      my: "⚠️ Organ Track သည် ဆေးဘက်ဆိုင်ရာ ရောဂါရှာဖွေရေးကိရိယာမဟုတ်ဘဲ ပရော်ဖက်ရှင်နယ်ဆေးဘက်ဆိုင်ရာအကြံဉာဏ်ကို အစားထိုးခြင်းမပြုပါ။",
    },

    sec3Title: {
      en: "3. User Eligibility",
      my: "၃. အသုံးပြုသူ အရည်အချင်းပြည့်မီမှု",
    },
    sec3Text: {
      en: "To use Organ Track, you must:",
      my: "Organ Track ကို အသုံးပြုရန် အောက်ပါတို့ လိုအပ်သည်-",
    },
    sec3Item1: {
      en: "Be able to provide accurate personal information",
      my: "တိကျသော ကိုယ်ရေးကိုယ်တာအချက်အလက်များ ပေးအပ်နိုင်ရမည်",
    },
    sec3Item2: {
      en: "Use the system for personal, non-commercial purposes",
      my: "ကိုယ်ပိုင်အသုံးပြုရန်အတွက်သာ၊ စီးပွားဖြစ်မဟုတ်သော ရည်ရွယ်ချက်ဖြင့် အသုံးပြုရမည်",
    },
    sec3Item3: {
      en: "Be responsible for maintaining the confidentiality of your login credentials",
      my: "သင့်အကောင့်ဝင်ရောက်မှုအချက်အလက်များ၏ လျှို့ဝှက်ချက်ကို ထိန်းရှိမ်းရန် တာဝန်ရှိသည်",
    },

    sec4Title: {
      en: "4. User Responsibilities",
      my: "၄. အသုံးပြုသူ၏ တာဝန်များ",
    },
    sec4Text: {
      en: "As a user, you agree to:",
      my: "အသုံးပြုသူအနေဖြင့် သင်သဘောတူသည်မှာ-",
    },
    sec4Item1: {
      en: "Provide accurate and truthful information",
      my: "တိကျမှန်ကန်သော အချက်အလက်များ ပေးအပ်ပါ",
    },
    sec4Item2: {
      en: "Use the system only for lawful and intended purposes",
      my: "တရားဝင်နှင့် ရည်ရွယ်ထားသော ရည်ရွယ်ချက်များအတွက်သာ အသုံးပြုပါ",
    },
    sec4Item3: {
      en: "Not misuse, hack, or attempt to disrupt system functionality",
      my: "စနစ်၏ လုပ်ဆောင်ချက်ကို အလွဲသုံးစားလုပ်ခြင်း၊ ဟက်ကင်းလုပ်ခြင်း သို့မဟုတ် အနှောင့်အယှက်ပေးရန် ကြိုးပမ်းခြင်းမပြုရ",
    },
    sec4Item4: {
      en: "Keep your account credentials secure",
      my: "သင့်အကောင့်အချက်အလက်များကို လုံခြုံအောင်ထားပါ",
    },
    sec4Item5: {
      en: "You are fully responsible for all activities that occur under your account.",
      my: "သင့်အကောင့်အောက်တွင် ဖြစ်ပေါ်လာသော လုပ်ဆောင်ချက်အားလုံးအတွက် သင်သည် အပြည့်အဝတာဝန်ရှိသည်။",
    },

    sec5Title: {
      en: "5. Health Disclaimer",
      my: "၅. ကျန်းမာရေးဆိုင်ရာ ငြင်းဆိုချက်",
    },
    sec5Item1: {
      en: "The health results, scores, suggestions, and warnings provided by Organ Track are informational only.",
      my: "Organ Track မှပေးသော ကျန်းမာရေးရလဒ်များ၊ အမှတ်များ၊ အကြံပြုချက်များနှင့် သတိပေးချက်များသည် သတင်းအချက်အလက်အတွက်သာဖြစ်သည်။",
    },
    sec5Item2: {
      en: "They are based on predefined rules and user inputs.",
      my: "၎င်းတို့သည် ကြိုတင်သတ်မှတ်ထားသော စည်းမျဉ်းများနှင့် အသုံးပြုသူထည့်သွင်းမှုများအပေါ် အခြေခံသည်။",
    },
    sec5Item3: {
      en: "The system does not guarantee medical accuracy.",
      my: "စနစ်သည် ဆေးဘက်ဆိုင်ရာ တိကျမှုကို အာမခံချက်မပေးပါ။",
    },
    sec5Item4: {
      en: "Always consult a qualified healthcare professional for medical concerns.",
      my: "ဆေးဘက်ဆိုင်ရာ စိုးရိမ်မှုများအတွက် အရည်အချင်းပြည့်မီသော ကျန်းမာရေးစောင့်ရှောက်မှုပညာရှင်နှင့် အမြဲတိုင်ပင်ပါ။",
    },
    sec5Item5: {
      en: "Organ Track is intended to support awareness and prevention, not diagnosis or treatment.",
      my: "Organ Track သည် ရောဂါရှာဖွေခြင်း သို့မဟုတ် ကုသခြင်းအတွက်မဟုတ်ဘဲ သတိပြုမိစေရန်နှင့် ကာကွယ်ရန်အတွက် ရည်ရွယ်ပါသည်။",
    },

    sec6Title: {
      en: "6. Data Collection & Usage",
      my: "၆. ဒေတာစုဆောင်းခြင်းနှင့် အသုံးပြုခြင်း",
    },
    sec6Item1: {
      en: "Organ Track may collect and store: Personal account information (name, email)",
      my: "Organ Track သည် ကိုယ်ရေးကိုယ်တာအကောင့်အချက်အလက်များ (အမည်၊ အီးမေးလ်) ကို စုဆောင်းသိမ်းဆည်းနိုင်သည်",
    },
    sec6Item2: {
      en: "Daily habit responses",
      my: "နေ့စဉ်အလေ့အထတုံ့ပြန်ချက်များ",
    },
    sec6Item3: { en: "Symptom tracking data", my: "ရောဂါလက္ခဏာခြေရာခံဒေတာ" },
    sec6Item4: {
      en: "Generated results and reports",
      my: "ထုတ်လုပ်ထားသော ရလဒ်များနှင့် အစီရင်ခံစာများ",
    },
    sec6Item5: {
      en: "This data is used only to:",
      my: "ဤဒေတာကို အောက်ပါအတွက်သာ အသုံးပြုသည်-",
    },
    sec6SubItem1: {
      en: "Generate health insights",
      my: "ကျန်းမာရေးဆိုင်ရာ ထိုးထွင်းသိမြင်မှုများ ထုတ်လုပ်ရန်",
    },
    sec6SubItem2: {
      en: "Display results and reports",
      my: "ရလဒ်များနှင့် အစီရင်ခံစာများ ပြသရန်",
    },
    sec6SubItem3: {
      en: "Improve system functionality",
      my: "စနစ်၏ လုပ်ဆောင်နိုင်စွမ်းကို မြှင့်တင်ရန်",
    },
    sec6Item6: {
      en: "User data will not be shared with third parties without consent.",
      my: "အသုံးပြုသူဒေတာကို ခွင့်ပြုချက်မရှိဘဲ တတိယအဖွဲ့အစည်းများနှင့် မျှဝေမည်မဟုတ်ပါ။",
    },

    sec7Title: { en: "7. Data Security", my: "၇. ဒေတာလုံခြုံရေး" },
    sec7Text: {
      en: "We take reasonable measures to protect user data. However:",
      my: "ကျွန်ုပ်တို့သည် အသုံးပြုသူဒေတာကို ကာကွယ်ရန် သင့်လျော်သောအစီအမံများ ဆောင်ရွက်ပါသည်။ သို့သော်-",
    },
    sec7Item1: {
      en: "No system is completely secure",
      my: "မည်သည့်စနစ်မျှ လုံးဝလုံခြုံမှုမရှိပါ",
    },
    sec7Item2: {
      en: "Organ Track cannot guarantee absolute data protection",
      my: "Organ Track သည် အကြွင်းမဲ့ဒေတာကာကွယ်မှုကို အာမမခံနိုင်ပါ",
    },
    sec7Item3: {
      en: "Users are responsible for safeguarding their login details",
      my: "အသုံးပြုသူများသည် ၎င်းတို့၏ အကောင့်ဝင်ရောက်မှုအသေးစိတ်များကို ကာကွယ်ရန် တာဝန်ရှိသည်",
    },

    sec8Title: {
      en: "8. Account Modification & Termination",
      my: "၈. အကောင့်ပြုပြင်ခြင်းနှင့် ရပ်ဆိုင်းခြင်း",
    },
    sec8Item1: {
      en: "Users may edit their profile information at any time",
      my: "အသုံးပြုသူများသည် ၎င်းတို့၏ ပရိုဖိုင်အချက်အလက်များကို အချိန်မရွေး ပြင်ဆင်နိုင်သည်",
    },
    sec8Item2: {
      en: "Organ Track reserves the right to suspend or terminate accounts if misuse or violations occur",
      my: "အလွဲသုံးစားမှု သို့မဟုတ် ချိုးဖောက်မှုများရှိပါက Organ Track သည် အကောင့်များကို ဆိုင်းငံ့ခြင်း သို့မဟုတ် ရပ်ဆိုင်းခြင်း ပြုလုပ်ပိုင်ခွင့်ရှိသည်",
    },
    sec8Item3: {
      en: "Users may log out at any time to protect their data",
      my: "အသုံးပြုသူများသည် ၎င်းတို့၏ဒေတာကို ကာကွယ်ရန် အချိန်မရွေး အကောင့်ထွက်နိုင်သည်",
    },

    sec9Title: { en: "9. System Availability", my: "၉. စနစ်ရရှိနိုင်မှု" },
    sec9Text: {
      en: "Organ Track is provided on an “as-is” basis. Temporary downtime may occur due to maintenance or technical issues. The system does not guarantee uninterrupted availability.",
      my: "Organ Track ကို “ရှိသည့်အတိုင်း” အခြေခံဖြင့် ပံ့ပိုးထားသည်။ ပြုပြင်ထိန်းသိမ်းမှု သို့မဟုတ် နည်းပညာဆိုင်ရာ ပြဿနာများကြောင့် ယာယီရပ်နားမှုများ ဖြစ်ပေါ်နိုင်သည်။ စနစ်သည် အနှောက်အယှက်ကင်းသော ရရှိနိုင်မှုကို အာမခံချက်မပေးပါ။",
    },

    sec10Title: {
      en: "10. Limitation of Liability",
      my: "၁၀. တာဝန်ယူမှုကန့်သတ်ချက်",
    },
    sec10Item1: {
      en: "Organ Track and its developers shall not be held liable for: Health decisions made based on system outputs",
      my: "Organ Track နှင့် ၎င်း၏ developer များသည် စနစ်ထုတ်လုပ်မှုများအပေါ် အခြေခံ၍ ပြုလုပ်သော ကျန်းမာရေးဆိုင်ရာ ဆုံးဖြတ်ချက်များအတွက် တာဝန်မယူပါ",
    },
    sec10Item2: {
      en: "Data loss due to technical issues",
      my: "နည်းပညာဆိုင်ရာ ပြဿနာများကြောင့် ဒေတာဆုံးရှုံးမှု",
    },
    sec10Item3: {
      en: "Any indirect or consequential damages",
      my: "သွယ်ဝိုက်သော သို့မဟုတ် နောက်ဆက်တွဲ ပျက်စီးဆုံးရှုံးမှုများ",
    },
    sec10Item4: {
      en: "Use of the system is at your own risk.",
      my: "စနစ်အသုံးပြုမှုသည် သင့်ကိုယ်ပိုင်အန္တရာယ်ဖြစ်သည်။",
    },

    sec11Title: {
      en: "11. Changes to Terms",
      my: "၁၁. စည်းကမ်းချက်များ ပြောင်းလဲခြင်း",
    },
    sec11Text: {
      en: "Organ Track reserves the right to update or modify these Terms and Conditions at any time. Continued use of the system after changes indicates acceptance of the updated terms.",
      my: "Organ Track သည် ဤစည်းကမ်းချက်များကို အချိန်မရွေး ပြင်ဆင်ခြင်း သို့မဟုတ် ပြောင်းလဲပိုင်ခွင့်ရှိသည်။ ပြောင်းလဲမှုများပြုလုပ်ပြီးနောက် စနစ်ကို ဆက်လက်အသုံးပြုခြင်းသည် ပြင်ဆင်ထားသော စည်းကမ်းချက်များကို လက်ခံကြောင်း ညွှန်ပြသည်။",
    },

    sec12Title: {
      en: "12. Contact Information",
      my: "၁၂. ဆက်သွယ်ရန်အချက်အလက်",
    },
    sec12Text: {
      en: "If you have questions or concerns regarding these Terms and Conditions, please contact the Organ Track development team.",
      my: "ဤစည်းကမ်းချက်များနှင့်ပတ်သက်၍ မေးခွန်းများ သို့မဟုတ် စိုးရိမ်မှုများရှိပါက Organ Track ဖွံ့ဖြိုးရေးအဖွဲ့ထံ ဆက်သွယ်ပါ။",
    },

    decline: { en: "Decline", my: "ငြင်းပယ်ရန်" },
    accept: { en: "Accept", my: "လက်ခံရန်" },
  };

  // ---------- Handlers ----------
  const handleAccept = () => {
    navigate("/register", {
      state: { ...formData, termsAccepted: true, lang },
    });
  };

  const handleDecline = () => {
    navigate("/register", {
      state: { ...formData, termsAccepted: false, lang },
    });
  };

  // ---------- Render ----------
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header with back button */}
      <div className="flex items-center gap-3 mb-6">
        {/* Always show the back button */}
        <button
          onClick={() => navigate(fromRegister ? "/register" : "/")}
          className="text-xl sm:text-2xl px-2 py-1 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          ←
        </button>
        <p
          className="text-sm sm:text-base text-[#9F9F9F] uppercase tracking-wide font-medium"
          style={{ fontFamily: "Montserrat", fontWeight: 400 }}
        >
          {t.agreement[lang]}
        </p>
      </div>

      {/* Main Title */}
      <h1
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14AE5C] mb-8"
        style={{ fontFamily: "Montserrat" }}
      >
        {t.title[lang]}
      </h1>

      {/* Content */}
      <div className="space-y-6 sm:space-y-8 max-w-4xl">
        {/* 1. Terms */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec1Title[lang]}
          </h2>
          <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
            {t.sec1Text[lang]}
          </p>
        </div>

        {/* 2. Purpose */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec2Title[lang]}
          </h2>
          <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
            {t.sec2Text[lang]}
          </p>
          <ul
            className="list-disc pl-5 space-y-1 mt-2 text-sm sm:text-base"
            style={{ fontFamily: "Roboto" }}
          >
            <li>{t.sec2Item1[lang]}</li>
            <li>{t.sec2Item2[lang]}</li>
            <li>{t.sec2Item3[lang]}</li>
          </ul>
          <p
            className="text-sm sm:text-base mt-2 font-bold text-yellow-600"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec2Warning[lang]}
          </p>
        </div>

        {/* 3. Eligibility */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec3Title[lang]}
          </h2>
          <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
            {t.sec3Text[lang]}
          </p>
          <ul
            className="list-disc pl-5 space-y-1 mt-2 text-sm sm:text-base"
            style={{ fontFamily: "Roboto" }}
          >
            <li>{t.sec3Item1[lang]}</li>
            <li>{t.sec3Item2[lang]}</li>
            <li>{t.sec3Item3[lang]}</li>
          </ul>
        </div>

        {/* 4. Responsibilities */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec4Title[lang]}
          </h2>
          <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
            {t.sec4Text[lang]}
          </p>
          <ul
            className="list-disc pl-5 space-y-1 mt-2 text-sm sm:text-base"
            style={{ fontFamily: "Roboto" }}
          >
            <li>{t.sec4Item1[lang]}</li>
            <li>{t.sec4Item2[lang]}</li>
            <li>{t.sec4Item3[lang]}</li>
            <li>{t.sec4Item4[lang]}</li>
            <li>{t.sec4Item5[lang]}</li>
          </ul>
        </div>

        {/* 5. Health Disclaimer */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec5Title[lang]}
          </h2>
          <ul
            className="list-disc pl-5 space-y-1 text-sm sm:text-base"
            style={{ fontFamily: "Roboto" }}
          >
            <li>{t.sec5Item1[lang]}</li>
            <li>{t.sec5Item2[lang]}</li>
            <li>{t.sec5Item3[lang]}</li>
            <li>{t.sec5Item4[lang]}</li>
            <li>{t.sec5Item5[lang]}</li>
          </ul>
        </div>

        {/* 6. Data Collection */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec6Title[lang]}
          </h2>
          <ul
            className="list-disc pl-5 space-y-1 text-sm sm:text-base"
            style={{ fontFamily: "Roboto" }}
          >
            <li>{t.sec6Item1[lang]}</li>
            <li>{t.sec6Item2[lang]}</li>
            <li>{t.sec6Item3[lang]}</li>
            <li>{t.sec6Item4[lang]}</li>
            <li>
              {t.sec6Item5[lang]}
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>{t.sec6SubItem1[lang]}</li>
                <li>{t.sec6SubItem2[lang]}</li>
                <li>{t.sec6SubItem3[lang]}</li>
              </ul>
            </li>
            <li>{t.sec6Item6[lang]}</li>
          </ul>
        </div>

        {/* 7. Data Security */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec7Title[lang]}
          </h2>
          <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
            {t.sec7Text[lang]}
          </p>
          <ul
            className="list-disc pl-5 space-y-1 mt-2 text-sm sm:text-base"
            style={{ fontFamily: "Roboto" }}
          >
            <li>{t.sec7Item1[lang]}</li>
            <li>{t.sec7Item2[lang]}</li>
            <li>{t.sec7Item3[lang]}</li>
          </ul>
        </div>

        {/* 8. Account Modification */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec8Title[lang]}
          </h2>
          <ul
            className="list-disc pl-5 space-y-1 text-sm sm:text-base"
            style={{ fontFamily: "Roboto" }}
          >
            <li>{t.sec8Item1[lang]}</li>
            <li>{t.sec8Item2[lang]}</li>
            <li>{t.sec8Item3[lang]}</li>
          </ul>
        </div>

        {/* 9. System Availability */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec9Title[lang]}
          </h2>
          <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
            {t.sec9Text[lang]}
          </p>
        </div>

        {/* 10. Limitation of Liability */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec10Title[lang]}
          </h2>
          <ul
            className="list-disc pl-5 space-y-1 text-sm sm:text-base"
            style={{ fontFamily: "Roboto" }}
          >
            <li>{t.sec10Item1[lang]}</li>
            <li>{t.sec10Item2[lang]}</li>
            <li>{t.sec10Item3[lang]}</li>
            <li>{t.sec10Item4[lang]}</li>
          </ul>
        </div>

        {/* 11. Changes to Terms */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec11Title[lang]}
          </h2>
          <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
            {t.sec11Text[lang]}
          </p>
        </div>

        {/* 12. Contact */}
        <div>
          <h2
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: "Roboto" }}
          >
            {t.sec12Title[lang]}
          </h2>
          <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
            {t.sec12Text[lang]}
          </p>
        </div>
      </div>

      {/* Accept / Decline buttons – only if fromRegister */}
      {fromRegister && (
        <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-between w-full max-w-md mx-auto">
          <button
            type="button"
            onClick={handleDecline}
            className="w-full sm:w-48 py-3 border-2 border-[#2DF251] rounded-lg bg-white text-[#2DF251] font-semibold text-base sm:text-lg"
            style={{ fontFamily: "Montserrat", fontWeight: 600 }}
          >
            {t.decline[lang]}
          </button>

          <button
            type="button"
            onClick={handleAccept}
            className="w-full sm:w-48 py-3 rounded-lg bg-[#2DF251] text-black font-semibold text-base sm:text-lg"
            style={{ fontFamily: "Montserrat", fontWeight: 600 }}
          >
            {t.accept[lang]}
          </button>
        </div>
      )}
    </div>
  );
}
