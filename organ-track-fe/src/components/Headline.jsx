import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    headline: "Track Your Organ Health with Precision",
    subheadline:
      "Monitor organ function, get personalized insights, and maintain optimal health through daily check-ins",
    stat1: "Health Monitoring",
    stat2: "Organs Tracked",
    stat3: "User Satisfaction",
  },
  mm: {
    headline:
      "သင့်ကိုယ်အင်္ဂါကျန်းမာရေးကို တိကျသေချာစွာ စောင့်ကြည့်မှတ်တမ်းတင်ပါ။",
    subheadline:
      "သင့်ကိုယ်အင်္ဂါတွေရဲ့ လုပ်ဆောင်ချက်ကို စောင့်ကြည့်စစ်ဆေးပါ။ နေ့စဉ်မှတ်တမ်းတင်ရုံနဲ့ သင့်အတွက် သီးသန့်ကျန်းမာရေး အကြံပြုချက်တွေကို ရရှိမှာဖြစ်ပြီး ကျန်းမာကြံ့ခိုင်တဲ့ ဘဝကို ပိုင်ဆိုင်နိုင်မှာပါ။",
    stat1: "ကျန်းမာရေးစောင့်ကြည့်ခြင်း",
    stat2: "စောင့်ကြည့်နိုင်သောအင်္ဂါများ",
    stat3: "အသုံးပြုသူစိတ်ကျေနပ်မှု",
  },
};

const Headline = ({ language = "en" }) => {
  const container = useRef();
  const headlineRef = useRef();
  const t = translations[language] || translations.en;

  // Typing animation – re‑run when language changes
  useGSAP(
    () => {
      const headline = headlineRef.current;
      if (!headline) return;

      // Kill any ongoing animation on this element
      gsap.killTweensOf(headline);

      const fullText = t.headline;
      headline.textContent = "";

      const obj = { length: 0 };

      gsap.to(obj, {
        length: fullText.length,
        duration: 4.0,
        ease: `steps(${fullText.length})`,
        scrollTrigger: {
          trigger: headline,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          headline.textContent = fullText.substring(0, Math.floor(obj.length));
        },
      });
    },
    { scope: container, dependencies: [language] },
  );

  // Stat counters (unchanged)
  useGSAP(
    () => {
      const counters = gsap.utils.toArray(".stat-number");

      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || "";

        let obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            counter.innerText = Math.floor(obj.val) + suffix;
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="max-w-[900px] mx-auto px-4 sm:px-5 py-6 sm:py-10"
    >
      {/* Headline with typing animation */}
      <h1
        ref={headlineRef}
        className="text-[1.8rem] xs:text-[2rem] sm:text-[2.3rem] md:text-[2.8rem] lg:text-[3.2rem] font-bold leading-tight mb-4 sm:mb-6 md:mb-[25px] text-[#1a535c] [text-shadow:0_2px_4px_rgba(0,0,0,0.1)]"
      >
        {/* Text filled by GSAP */}
      </h1>

      {/* Subheadline */}
      <p className="text-base xs:text-lg sm:text-xl md:text-[1.4rem] text-[#4a6b73] mb-6 sm:mb-10 md:mb-[50px] leading-relaxed font-normal">
        {t.subheadline}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 min-[475px]:grid-cols-3 gap-4 sm:gap-5 md:gap-8 lg:gap-20 mt-6 sm:mt-10 md:mt-[60px]">
        {/* Stat Item 1 */}
        <div className="flex flex-col items-center p-4 sm:p-5 bg-white/90 rounded-2xl shadow-[0_5px_15px_rgba(0,168,107,0.1)]">
          <span
            className="stat-number text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem] font-bold bg-gradient-to-r from-[#00a86b] to-[#0d98ba] bg-clip-text text-transparent leading-none"
            data-target="24"
            data-suffix="/7"
          >
            0
          </span>
          <span className="text-xs sm:text-sm text-[#4a6b73] mt-2 uppercase tracking-wider font-semibold text-center">
            {t.stat1}
          </span>
        </div>

        {/* Stat Item 2 */}
        <div className="flex flex-col items-center p-4 sm:p-5 bg-white/90 rounded-2xl shadow-[0_5px_15px_rgba(0,168,107,0.1)]">
          <span
            className="stat-number text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem] font-bold bg-gradient-to-r from-[#00a86b] to-[#0d98ba] bg-clip-text text-transparent leading-none"
            data-target="10"
            data-suffix="+"
          >
            0
          </span>
          <span className="text-xs sm:text-sm text-[#4a6b73] mt-2 uppercase tracking-wider font-semibold text-center">
            {t.stat2}
          </span>
        </div>

        {/* Stat Item 3 */}
        <div className="flex flex-col items-center p-4 sm:p-5 bg-white/90 rounded-2xl shadow-[0_5px_15px_rgba(0,168,107,0.1)]">
          <span
            className="stat-number text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem] font-bold bg-gradient-to-r from-[#00a86b] to-[#0d98ba] bg-clip-text text-transparent leading-none"
            data-target="98"
            data-suffix="%"
          >
            0
          </span>
          <span className="text-xs sm:text-sm text-[#4a6b73] mt-2 uppercase tracking-wider font-semibold text-center">
            {t.stat3}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Headline;
