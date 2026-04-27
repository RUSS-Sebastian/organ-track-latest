import React from "react";

const translations = {
  en: {
    heading: "Start Tracking Your Organ Health Today",
    button: "Start Tracking Now",
  },
  mm: {
    heading: "သင့်ကိုယ်အင်္ဂါကျန်းမာရေးကို ယနေ့ပဲ စတင်စစ်ဆေးလိုက်ပါ။",
    button: "ယခုပဲ စတင်လိုက်ပါ။",
  },
};

const CTASection = ({ language = "en" }) => {
  const t = translations[language] || translations.en;

  const handleGetStarted = () => {
    window.location.href = "/login";
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-28 px-4 sm:px-5 text-center bg-gradient-to-br from-[#00a86b] to-[#0d98ba] rounded-2xl my-8 sm:my-12 md:my-16 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          {t.heading}
        </h2>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-center items-center mt-6 sm:mt-8 mb-8 sm:mb-10">
          <button
            onClick={handleGetStarted}
            className="group w-full sm:w-auto max-w-[280px] sm:max-w-none bg-white text-[#00a86b] border-none py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 lg:py-5 lg:px-11 text-base sm:text-lg md:text-xl rounded-full cursor-pointer flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 font-bold shadow-[0_10px_25px_rgba(255,255,255,0.2)] hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_15px_35px_rgba(255,255,255,0.3)]"
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
