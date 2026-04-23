import React from "react";

const translations = {
  en: {
    sectionTitle: "What Makes OrganTrack Special",
    sectionSubtitle:
      "Experience comprehensive organ health monitoring designed for proactive wellness",
    benefits: [
      {
        icon: "fa-solid fa-calendar-check",
        title: "Daily Health Tracking",
        description:
          "Answer structured daily lifestyle questions on diet, sleep, stress, hydration, and habits. Our system analyzes your inputs using medical rule-based logic to evaluate organ impact and detect early risk patterns.",
        quote: "Small daily habits create big health outcomes.",
      },
      {
        icon: "fa-solid fa-stethoscope",
        title: "Organ-Specific Monitoring",
        description:
          "Select a specific organ and answer symptom-tracking questions tailored to it. The system generates personalized risk levels, recommendations, warnings, and visual organ score trends to support early prevention.",
        quote: "Listen to your organs before they whisper into emergencies.",
      },
      {
        icon: "fa-solid fa-chart-simple",
        title: "Comprehensive Health Reports",
        description:
          "Generate detailed date-range reports including organ-wise scores, habit streaks, risk analysis, explanations, and overall health summaries — downloadable as structured PDF reports for tracking and sharing.",
        quote: "Records help us prevent risks.",
      },
    ],
  },
  mm: {
    sectionTitle: "OrganTrack ဘာကြောင့်ထူးခြားသလဲ",
    sectionSubtitle:
      "ကြိုတင်ကာကွယ်သောကျန်းမာရေးအတွက် ဒီဇိုင်းထုတ်ထားသည့် ပြည့်စုံသောအင်္ဂါကျန်းမာရေးစောင့်ကြည့်မှုကို ခံစားပါ",
    benefits: [
      {
        icon: "fa-solid fa-calendar-check",
        title: "နေ့စဉ်ကျန်းမာရေးစောင့်ကြည့်ခြင်း",
        description:
          "အစားအသောက်၊ အိပ်စက်မှု၊ စိတ်ဖိစီးမှု၊ ရေဓာတ်နှင့် အလေ့အထများဆိုင်ရာ ဖွဲ့စည်းထားသောနေ့စဉ်မေးခွန်းများကို ဖြေဆိုပါ။ ကျွန်ုပ်တို့၏စနစ်သည် သင့်အဖြေများကို ဆေးဘက်ဆိုင်ရာစည်းမျဉ်းအခြေပြု ယုတ္တိဗေဒဖြင့် ခွဲခြမ်းစိတ်ဖြာပြီး အင်္ဂါအပေါ်သက်ရောက်မှုနှင့် စောစီးစွာအန္တရာယ်ပုံစံများကို သိရှိနိုင်သည်။",
        quote:
          "နေ့စဉ်အလေ့အထငယ်များက ကြီးမားသောကျန်းမာရေးရလဒ်များကို ဖန်တီးပေးသည်။",
      },
      {
        icon: "fa-solid fa-stethoscope",
        title: "အင်္ဂါအလိုက်စောင့်ကြည့်ခြင်း",
        description:
          "တိကျသောအင်္ဂါတစ်ခုကိုရွေးချယ်ပြီး ၎င်းနှင့်သက်ဆိုင်သော ရောဂါလက္ခဏာစောင့်ကြည့်မေးခွန်းများကို ဖြေဆိုပါ။ စနစ်သည် ကိုယ်ပိုင်အန္တရာယ်အဆင့်များ၊ အကြံပြုချက်များ၊ သတိပေးချက်များနှင့် စောစီးစွာကာကွယ်မှုကို ပံ့ပိုးရန် အင်္ဂါရမှတ်လမ်းကြောင်းများကို ထုတ်ပေးသည်။",
        quote:
          "သင့်အင်္ဂါများ အရေးပေါ်အခြေအနေသို့မရောက်မီ သူတို့၏တိုးတိုးပြောသံကို နားထောင်ပါ။",
      },
      {
        icon: "fa-solid fa-chart-simple",
        title: "ပြည့်စုံသောကျန်းမာရေးအစီရင်ခံစာများ",
        description:
          "အင်္ဂါအလိုက်ရမှတ်များ၊ အလေ့အထဆက်တိုက်မှတ်တမ်း၊ အန္တရာယ်ခွဲခြမ်းစိတ်ဖြာမှု၊ ရှင်းလင်းချက်များနှင့် အလုံးစုံကျန်းမာရေးအကျဉ်းချုပ်များပါဝင်သော ရက်စွဲအပိုင်းအခြားအလိုက် အစီရင်ခံစာများကို ထုတ်ပေးပါ — စောင့်ကြည့်ရန်နှင့် မျှဝေရန်အတွက် ဖွဲ့စည်းထားသော PDF အစီရင်ခံစာများအဖြစ် ဒေါင်းလုဒ်လုပ်နိုင်သည်။",
        quote: "မှတ်တမ်းများက ကျွန်ုပ်တို့ကို အန္တရာယ်များမှ ကာကွယ်ပေးသည်။",
      },
    ],
  },
};

const KeyBenefits = ({ language = "en" }) => {
  const t = translations[language] || translations.en;
  const benefits = t.benefits;

  return (
    <section className="py-20 px-[10%] bg-gradient-to-br from-[#f8fff8] to-[#e8ffe8] text-center">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl text-[#1e5c3f] mb-3 font-bold">
          {t.sectionTitle}
        </h2>
        <p className="text-lg text-[#4f6f60] max-w-3xl mx-auto">
          {t.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white p-8 md:p-9 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
          >
            <div className="text-5xl mb-5">
              <i className={`${benefit.icon} text-[#00a86b]`}></i>
            </div>
            <h3 className="text-xl md:text-2xl text-[#1e5c3f] mb-4 font-bold">
              {benefit.title}
            </h3>
            <p className="text-base text-[#4f6f60] leading-relaxed text-center mb-6">
              {benefit.description}
            </p>
            <div className="inline-block max-w-[90%] mt-3 italic text-[15px] text-[#2e7d5b] bg-[#e8f5ef] px-5 py-3 rounded-xl relative">
              <span className="text-xl text-[#1e5c3f] font-bold">“</span>
              {benefit.quote}
              <span className="text-xl text-[#1e5c3f] font-bold">”</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyBenefits;
