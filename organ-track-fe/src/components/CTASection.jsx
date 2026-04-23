import React from "react";

const translations = {
  en: {
    heading: "Start Tracking Your Organ Health Today",
    button: "Start Tracking Now",
  },
  mm: {
    heading: "ယနေ့ပင် သင့်အင်္ဂါကျန်းမာရေးကို စတင်စောင့်ကြည့်ပါ",
    button: "ယခုစတင်စောင့်ကြည့်ပါ",
  },
};

const CTASection = ({ language = "en" }) => {
  const t = translations[language] || translations.en;

  const handleGetStarted = () => {
    window.location.href = "/login";
  };

  return (
    <section className="py-24 md:py-28 px-5 text-center bg-gradient-to-br from-[#00a86b] to-[#0d98ba] rounded-2xl my-16 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          {t.heading}
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8 mb-10">
          <button
            onClick={handleGetStarted}
            className="group w-full md:w-auto max-w-[300px] md:max-w-none bg-white text-[#00a86b] border-none py-5 px-10 md:py-5 md:px-11 text-lg md:text-xl rounded-full cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 font-bold shadow-[0_10px_25px_rgba(255,255,255,0.2)] hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_15px_35px_rgba(255,255,255,0.3)]"
          >
            {t.button}
            <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
