import React from "react";
import doctorImage from "../assets/doctor-image.png";

const translations = {
  en: {
    doctorTitle: "Medical Advisory Supported",
    doctorDescription:
      "Our organ tracking algorithms are reviewed by healthcare professionals to ensure accurate, reliable health monitoring.",
    badge1: "HIPAA Compliant",
    badge2: "Doctor Reviewed",
    badge3: "Evidence-Based",
    headline: "Professional Organ Health Tracking",
    subheadline:
      "Monitor your vital organs with medical-grade precision. Get insights that help you make informed health decisions.",
    feature1: "Medical advisory supported",
    feature2: "Clinical accuracy standards",
    feature3: "Professional health reports",
    feature4: "Secure & confidential",
    cta: "Start Monitoring",
  },
  mm: {
    doctorTitle: "ဆေးဘက်ဆိုင်ရာ အကြံပေးချက်များဖြင့် ပံ့ပိုးထားသည်။",
    doctorDescription:
      "တိကျခိုင်မာသော ကျန်းမာရေးစောင့်ကြည့်မှုအတွက် ကျွန်ုပ်တို့၏ စနစ်များကို ဆေးဘက်ဆိုင်ရာပညာရှင်များက အနီးကပ်ကြီးကြပ် စစ်ဆေးထားပါသည်။",
    badge1: "HIPAA လိုက်နာမှုရှိသော စနစ်",
    badge2: "ပညာရှင်များ စစ်ဆေးပြီး",
    badge3: "လက်တွေ့အထောက်အထားအခြေပြု",
    headline: "ကျွမ်းကျင်အဆင့် ကိုယ်အင်္ဂါစောင့်ကြည့်မှု",
    subheadline:
      "သင့်ကိုယ်တွင်းအင်္ဂါတွေကို ဆေးဘက်ဆိုင်ရာအဆင့်မီ စောင့်ကြည့်စစ်ဆေးလိုက်ပါ။ သင့်ကျန်းမာရေးအတွက် မှန်ကန်တဲ့ ဆုံးဖြတ်ချက်တွေ ချနိုင်ဖို့ လိုအပ်တဲ့ အချက်အလက်တွေကို ရယူပါ။",
    feature1: "ဆေးဘက်ဆိုင်ရာ အကြံပေးချက်များဖြင့် ပံ့ပိုးထားသည်",
    feature2: "ဆေးဘက်ဆိုင်ရာ တိကျမှုစံနှုန်းများ",
    feature3: "ကျွမ်းကျင်အဆင့် ကျန်းမာရေး အစီရင်ခံစာများ",
    feature4: "လုံခြုံစိတ်ချရသည်",
    cta: "စတင်စောင့်ကြည့်ပါ",
  },
};

const HeroSection = ({ language = "en" }) => {
  const t = translations[language] || translations.en;

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-5 py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column - Doctor Card */}
        <div className="order-2 lg:order-1">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 md:p-8 border border-white/40 shadow-xl max-w-md lg:max-w-none mx-auto">
            <div className="flex flex-col items-center text-center">
              {/* Doctor Image */}
              <div className="mb-4">
                <img
                  src={doctorImage}
                  alt="Medical Professional"
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain drop-shadow-lg"
                />
              </div>

              {/* Doctor Info */}
              <h3 className="text-[#1a535c] text-xl sm:text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-1">
                <span>{t.doctorTitle}</span>
              </h3>
              <p className="text-[#4a6b73] text-sm sm:text-base leading-relaxed mb-4 max-w-md">
                {t.doctorDescription}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge>{t.badge2}</Badge>
                <Badge>{t.badge3}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Text & CTA */}
        <div className="order-1 lg:order-2">
          <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-auto lg:mr-0 text-center lg:text-left">
            {/* Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg lg:text-center">
              {t.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base xs:text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed lg:text-center">
              {t.subheadline}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 mb-6 sm:mb-8 max-w-md lg:max-w-xl mx-auto">
              <FeatureItem>{t.feature1}</FeatureItem>
              <FeatureItem>{t.feature2}</FeatureItem>
              <FeatureItem>{t.feature3}</FeatureItem>
              <FeatureItem>{t.feature4}</FeatureItem>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-center">
              <button
                onClick={() => (window.location.href = "/login")}
                className="bg-white text-[#00a86b] font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <i className="fas fa-play-circle"></i>
                {t.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper components (unchanged)
const Badge = ({ children }) => (
  <div className="flex items-center gap-1.5 text-[#1a535c] text-xs sm:text-sm font-medium px-3 py-1.5 bg-[rgba(0,168,107,0.1)] rounded-full border border-[rgba(0,168,107,0.2)]">
    <i className="fas fa-check-circle text-[#00a86b] text-xs"></i>
    <span>{children}</span>
  </div>
);

const FeatureItem = ({ children }) => (
  <div className="flex items-center gap-2 text-white text-sm sm:text-base bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20">
    <i className="fas fa-check-circle text-[#e8f5e9] text-base"></i>
    <span>{children}</span>
  </div>
);

export default HeroSection;
