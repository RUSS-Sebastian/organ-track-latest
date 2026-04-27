import React, { useState } from "react";

const translations = {
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Get started with OrganTrack in minutes",
    faqs: [
      {
        question: "How do I start using OrganTrack?",
        answer:
          "Simply click 'Start Tracking Now' on our homepage. No registration needed - you can begin monitoring your organs immediately with our free basic features.",
      },
      {
        question: "Which organs can I track?",
        answer:
          "OrganTrack allows you to monitor 10+ vital organs including heart, lungs, liver, kidneys, brain, digestive system, and more. Each organ has specific health indicators.",
      },
      {
        question: "How often should I check my organ health?",
        answer:
          "We recommend daily check-ins for consistent monitoring. However, you can track as frequently as you'd like based on your health goals and needs.",
      },
      {
        question: "Can I generate reports without registering?",
        answer:
          "Yes! You can generate basic health reports immediately. Registration unlocks additional features like long-term trend analysis and detailed PDF reports.",
      },
      {
        question: "Is my health data saved if I don't register?",
        answer:
          "Session data is saved locally in your browser. For long-term tracking across devices, we recommend creating a free account.",
      },
      {
        question: "What's the difference between free and registered features?",
        answer:
          "Free features include basic organ tracking and reports. Registration adds: long-term history, PDF report downloads, personalized suggestions, and multi-device sync.",
      },
    ],
    ctaText: "Ready to start your organ health journey?",
    ctaButton: "Start Tracking Now",
  },
  mm: {
    title: "အမေးများသော မေးခွန်းများ",
    subtitle: "မိနစ်ပိုင်းအတွင်း OrganTrack ဖြင့် စတင်ပါ",
    faqs: [
      {
        question: "OrganTrack ကို ဘယ်လိုစသုံးရမလဲ။",
        answer:
          "ကျွန်ုပ်တို့၏ ပင်မစာမျက်နှာရှိ 'ယခုစတင်စောင့်ကြည့်ပါ' ကို နှိပ်ပါ။ မှတ်ပုံတင်ရန်မလိုပါ - အခမဲ့အခြေခံလုပ်ဆောင်ချက်များဖြင့် သင့်အင်္ဂါများကို ချက်ချင်းစတင်စောင့်ကြည့်နိုင်ပါသည်။",
      },
      {
        question: "ဘယ်အင်္ဂါတွေကို စောင့်ကြည့်နိုင်မလဲ။",
        answer:
          "OrganTrack သည် နှလုံး၊ အဆုတ်၊ အသည်း၊ ကျောက်ကပ်၊ ဦးနှောက်၊ အစာခြေစနစ်နှင့် အခြားအရာများအပါအဝင် အရေးကြီးအင်္ဂါ ၁၀ ခုကျော်ကို စောင့်ကြည့်နိုင်ပါသည်။ အင်္ဂါတစ်ခုစီတွင် တိကျသောကျန်းမာရေးညွှန်းကိန်းများရှိသည်။",
      },
      {
        question: "အင်္ဂါကျန်းမာရေးကို ဘယ်နှစ်ကြိမ်စစ်ဆေးသင့်သလဲ။",
        answer:
          "တသမတ်တည်းစောင့်ကြည့်ရန်အတွက် နေ့စဉ်စစ်ဆေးရန် အကြံပြုပါသည်။ သို့သော် သင့်ကျန်းမာရေးပန်းတိုင်နှင့် လိုအပ်ချက်များပေါ်မူတည်၍ သင်နှစ်သက်သလောက် မကြာခဏစောင့်ကြည့်နိုင်ပါသည်။",
      },
      {
        question: "မှတ်ပုံမတင်ဘဲ အစီရင်ခံစာထုတ်နိုင်သလား။",
        answer:
          "ဟုတ်ကဲ့။ အခြေခံကျန်းမာရေးအစီရင်ခံစာများကို ချက်ချင်းထုတ်နိုင်ပါသည်။ မှတ်ပုံတင်ခြင်းဖြင့် ရေရှည်လမ်းကြောင်းသစ်ခွဲခြမ်းစိတ်ဖြာခြင်းနှင့် အသေးစိတ် PDF အစီရင်ခံစာများကဲ့သို့သော ထပ်ဆောင်းလုပ်ဆောင်ချက်များကို သော့ဖွင့်နိုင်ပါသည်။",
      },
      {
        question:
          "မှတ်ပုံမတင်ရင် ကျွန်တော့်ကျန်းမာရေးဒေတာကို သိမ်းထားပေးမှာလား။",
        answer:
          "ဆက်ရှင်ဒေတာကို သင့်ဘရောက်ဇာတွင် စက်တွင်းသိမ်းဆည်းထားပါသည်။ စက်ပစ္စည်းအများအပြားတွင် ရေရှည်စောင့်ကြည့်ရန်အတွက် အခမဲ့အကောင့်ဖွင့်ရန် အကြံပြုပါသည်။",
      },
      {
        question:
          "အခမဲ့နှင့် မှတ်ပုံတင်ထားသော လုပ်ဆောင်ချက်များ ကွာခြားချက်က ဘာလဲ။",
        answer:
          "အခမဲ့လုပ်ဆောင်ချက်များတွင် အခြေခံအင်္ဂါစောင့်ကြည့်ခြင်းနှင့် အစီရင်ခံစာများပါဝင်သည်။ မှတ်ပုံတင်ခြင်းဖြင့် ရေရှည်မှတ်တမ်း၊ PDF အစီရင်ခံစာဒေါင်းလုဒ်များ၊ ကိုယ်ပိုင်အကြံပြုချက်များနှင့် စက်မျိုးစုံချိန်ကိုက်ခြင်းတို့ကို ထည့်သွင်းပေးပါသည်။",
      },
    ],
    ctaText: "သင့်အင်္ဂါကျန်းမာရေးခရီးကို စတင်ရန် အဆင်သင့်ဖြစ်ပြီလား။",
    ctaButton: "ယခုစတင်စောင့်ကြည့်ပါ",
  },
};

const FAQ = ({ language = "en" }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const t = translations[language] || translations.en;
  const faqs = t.faqs;

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-5 max-w-[900px] mx-auto">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1e5c3f] font-bold mb-2">
          {t.title}
        </h2>
        <p className="text-base sm:text-lg text-[#4f6f60]">{t.subtitle}</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-[0_5px_15px_rgba(0,168,107,0.1)] overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
              activeIndex === index
                ? "border-[#00a86b] shadow-[0_8px_25px_rgba(0,168,107,0.15)]"
                : "border-[#e0f2e9] hover:border-[#00a86b] hover:shadow-[0_8px_25px_rgba(0,168,107,0.15)]"
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center p-4 sm:p-5 md:p-6 bg-[#f8fdf9]">
              <h3 className="text-sm sm:text-base md:text-lg text-[#1a535c] font-semibold flex-1 pr-4 sm:pr-5">
                {faq.question}
              </h3>
              <span
                className={`text-2xl sm:text-3xl text-[#00a86b] font-light min-w-[24px] text-center transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            <div
              className="transition-all duration-500 overflow-hidden"
              style={{
                maxHeight: activeIndex === index ? "500px" : "0px",
                padding: activeIndex === index ? "0 1.5rem 1.5rem" : "0 1.5rem",
              }}
            >
              <p className="text-[#4a6b73] leading-relaxed text-xs sm:text-sm md:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 sm:mt-16 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] rounded-2xl border-2 border-[#00a86b]">
        <p className="text-lg sm:text-xl md:text-2xl text-[#1a535c] mb-4 sm:mb-6 font-medium">
          {t.ctaText}
        </p>
        <button
          className="w-full sm:w-auto bg-gradient-to-r from-[#00a86b] to-[#0d98ba] text-white border-none py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-9 text-sm sm:text-base md:text-lg rounded-full cursor-pointer inline-flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 font-semibold shadow-[0_8px_20px_rgba(0,168,107,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,168,107,0.4)]"
          onClick={() => (window.location.href = "/login")}
        >
          <i className="fas fa-heartbeat"></i>
          {t.ctaButton}
        </button>
      </div>
    </section>
  );
};

export default FAQ;
