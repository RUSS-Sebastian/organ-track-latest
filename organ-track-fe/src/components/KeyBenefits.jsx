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
    sectionTitle: "OrganTrack ရဲ့ ထူးခြားချက်များ",
    sectionSubtitle:
      "ကြိုတင်ကာကွယ်သော ကျန်းမာရေးစနစ်အတွက် ဖန်တီးထားသည့် ပြည့်စုံသော ကိုယ်အင်္ဂါစောင့်ကြည့်စစ်ဆေးမှုများကို ခံစားကြည့်ပါ",
    benefits: [
      {
        icon: "fa-solid fa-calendar-check",
        title: "နေ့စဉ်ကျန်းမာရေးစောင့်ကြည့်ခြင်း",
        description:
          "စားသောက်မှု၊ အိပ်စက်ခြင်း၊ စိတ်ဖိစီးမှု၊ ရေဓာတ်ဖြည့်တင်းမှုနှင့် နေထိုင်မှုအလေ့အထများအကြောင်း နေ့စဉ်မေးခွန်းများကို ဖြေဆိုပါ။ ကျွန်ုပ်တို့၏စနစ်သည် ဆေးဘက်ဆိုင်ရာ ကျိုးကြောင်းဆီလျော်မှု (medical rule-based logic) ကို အသုံးပြုကာ ကိုယ်အင်္ဂါများအပေါ် သက်ရောက်မှုနှင့် အန္တရာယ်ဖြစ်နိုင်ခြေများကို ကြိုတင်ခန့်မှန်းပေးပါသည်။",
        quote:
          "နေ့စဉ်အလေ့အထငယ်များက ကြီးမားသောကျန်းမာရေးရလဒ်များကို ဖန်တီးပေးသည်။",
      },
      {
        icon: "fa-solid fa-stethoscope",
        title: "သက်ဆိုင်ရာ ကိုယ်အင်္ဂါအလိုက် စောင့်ကြည့်ခြင်း",
        description:
          "စစ်ဆေးလိုသည့် ကိုယ်အင်္ဂါကို ရွေးချယ်ပြီး ၎င်းနှင့်သက်ဆိုင်သည့် ရောဂါလက္ခဏာ မေးခွန်းများကို ဖြေဆိုပါ။ ကျွန်ုပ်တို့၏စနစ်မှ သင့်အတွက် သီးသန့် ဘေးအန္တရာယ်အဆင့်၊ အကြံပြုချက်၊ သတိပေးချက်နှင့် ကိုယ်အင်္ဂါကျန်းမာရေး အမှတ်ပြဇယား (score trends) များကို ထုတ်ပြန်ပေးမည် ဖြစ်ပါသည်။",
        quote:
          "သင့်အင်္ဂါများ အရေးပေါ်အခြေအနေသို့မရောက်မီ သူတို့၏ပြောသံကို နားထောင်ပါ။",
      },
      {
        icon: "fa-solid fa-chart-simple",
        title: "ပြည့်စုံသောကျန်းမာရေးအစီရင်ခံစာများ",
        description:
          "သတ်မှတ်ထားသည့် ရက်စွဲအလိုက် ကိုယ်အင်္ဂါတစ်ခုချင်းစီ၏ ကျန်းမာရေးအမှတ်များ၊ အလေ့အထမှတ်တမ်းများ၊ အန္တရာယ်ခွဲခြမ်းစိတ်ဖြာချက်နှင့် ကျန်းမာရေးအကျဉ်းချုပ်များကို အသေးစိတ် ထုတ်ယူနိုင်ပါသည်။ ၎င်းတို့ကို PDF အနေဖြင့်လည်း ဒေါင်းလုဒ်ရယူနိုင်ပါသည်။",
        quote: "မှတ်တမ်းများက ဘေးအန္တရာယ်များကို ကာကွယ်ပေးနိုင်သည်။",
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
