import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import brainImg from "../assets/svgs/brain.svg";
import heartImg from "../assets/svgs/heart.svg";
import lungsImg from "../assets/svgs/lungs.svg";
import stomachImg from "../assets/svgs/stomach.svg";
import kidneyImg from "../assets/svgs/kidney.svg";
import liverImg from "../assets/svgs/liver.svg";
import musclesImg from "../assets/svgs/muscle.svg";
import intestineImg from "../assets/svgs/intestine.svg";
import gallBladderImg from "../assets/svgs/gall.svg";
import pancreasImg from "../assets/svgs/pancreas.svg";
import skinImg from "../assets/svgs/skin.svg";
import bladderImg from "../assets/svgs/bladder.svg";
import bloodVesselsImg from "../assets/svgs/blood.svg";
import boneImg from "../assets/svgs/bone.svg";
import prostateImg from "../assets/svgs/penis.svg";
import uterusImg from "../assets/svgs/uterus.svg";

const organImages = {
  brain: brainImg,
  heart: heartImg,
  lungs: lungsImg,
  stomach: stomachImg,
  kidney: kidneyImg,
  liver: liverImg,
  muscles: musclesImg,
  intestine: intestineImg,
  gallBladder: gallBladderImg,
  pancreas: pancreasImg,
  skin: skinImg,
  bladder: bladderImg,
  bloodVessels: bloodVesselsImg,
  bone: boneImg,
  prostate: prostateImg,
  uterus: uterusImg,
};

const organKeys = [
  { key: "brain", color: "#6c5ce7" },
  { key: "heart", color: "#ff6b6b" },
  { key: "lungs", color: "#4ecdc4" },
  { key: "stomach", color: "#fd79a8" },
  { key: "kidney", color: "#c44569" },
  { key: "liver", color: "#ffe66d" },
  { key: "muscles", color: "#e17055" },
  { key: "intestine", color: "#a29bfe" },
  { key: "gallBladder", color: "#b2bec3" },
  { key: "pancreas", color: "#74b9ff" },
  { key: "skin", color: "#fab1a0" },
  { key: "bladder", color: "#81ecec" },
  { key: "bloodVessels", color: "#ff9ff3" },
  { key: "bone", color: "#fdcb6e" },
  { key: "prostate", color: "#55efc4" },
  { key: "uterus", color: "#dfe6e9" },
];

const translations = {
  en: {
    title: "Organs you can track",
    organNames: {
      brain: "Brain",
      heart: "Heart",
      lungs: "Lungs",
      stomach: "Stomach",
      kidney: "Kidney",
      liver: "Liver",
      muscles: "Muscles",
      intestine: "Intestine",
      gallBladder: "Gall Bladder",
      pancreas: "Pancreas",
      skin: "Skin",
      bladder: "Bladder",
      bloodVessels: "Blood Vessels",
      bone: "Bone",
      prostate: "Prostate",
      uterus: "Uterus",
    },
  },
  mm: {
    title: "စောင့်ကြည့်နိုင်သော အင်္ဂါများ",
    organNames: {
      brain: "ဦးနှောက်",
      heart: "နှလုံး",
      lungs: "အဆုတ်",
      stomach: "အစာအိမ်",
      kidney: "ကျောက်ကပ်",
      liver: "အသည်း",
      muscles: "ကြွက်သား",
      intestine: "အူလမ်းကြောင်း",
      gallBladder: "သည်းခြေအိတ်",
      pancreas: "ပန်ကရိယ",
      skin: "အရေပြား",
      bladder: "ဆီးအိမ်",
      bloodVessels: "သွေးကြောများ",
      bone: "အရိုး",
      prostate: "ဆီးကျိတ်",
      uterus: "သားအိမ်",
    },
  },
};

const OrganSlider = ({ language = "en" }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const t = translations[language] || translations.en;
  const organs = organKeys.map((item) => ({
    ...item,
    name: t.organNames[item.key] || item.key,
  }));

  const CLONE_COUNT = 6;
  const extendedOrgans = [
    ...organs.slice(-CLONE_COUNT),
    ...organs,
    ...organs.slice(0, CLONE_COUNT),
  ];

  const totalOriginal = organs.length;
  const startIndex = CLONE_COUNT;
  const currentIndexRef = useRef(startIndex);
  const cardWidthRef = useRef(0);
  const autoSlideTimerRef = useRef(null);

  // Update visible count based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 475) setVisibleCount(2);
      else if (width < 640) setVisibleCount(2);
      else if (width < 768) setVisibleCount(3);
      else if (width < 1024) setVisibleCount(3);
      else setVisibleCount(4);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const getCardWidth = () => {
    if (!trackRef.current) return 0;
    const firstCard = trackRef.current.children[startIndex];
    if (!firstCard) return 0;
    const cardRect = firstCard.getBoundingClientRect();
    const trackStyle = window.getComputedStyle(trackRef.current);
    const gap = parseFloat(trackStyle.gap) || 16;
    return cardRect.width + gap;
  };

  const goToIndex = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const track = trackRef.current;
    let cardWidth = getCardWidth();

    // Safety: if cardWidth is 0 (e.g., track not yet measured), abort and retry next frame
    if (!cardWidth || cardWidth <= 0) {
      requestAnimationFrame(() => {
        setIsAnimating(false);
        goToIndex(newIndex);
      });
      return;
    }

    cardWidthRef.current = cardWidth;
    const distance = -newIndex * cardWidth;

    gsap.to(track, {
      x: distance,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        let currentCardWidth = getCardWidth();
        if (!currentCardWidth || currentCardWidth <= 0) {
          currentCardWidth = cardWidthRef.current; // fallback to last known
        }

        let adjustedIndex = newIndex;

        if (newIndex >= startIndex + totalOriginal) {
          adjustedIndex = startIndex;
        } else if (newIndex < startIndex) {
          adjustedIndex = startIndex + totalOriginal - 1;
        }

        if (adjustedIndex !== newIndex) {
          gsap.set(track, { x: -adjustedIndex * currentCardWidth });
        }

        currentIndexRef.current = adjustedIndex;
        setIsAnimating(false);
      },
    });
  };

  const nextSlide = () => {
    if (isAnimating) return;
    goToIndex(currentIndexRef.current + 1);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    goToIndex(currentIndexRef.current - 1);
  };

  // Initialize track position
  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const cardWidth = getCardWidth();
      cardWidthRef.current = cardWidth;
      gsap.set(track, { x: -startIndex * cardWidth });
      currentIndexRef.current = startIndex;
    },
    { dependencies: [visibleCount, language] },
  );

  // Recalculate position on resize
  useEffect(() => {
    const handleResize = () => {
      const track = trackRef.current;
      if (!track) return;
      const cardWidth = getCardWidth();
      cardWidthRef.current = cardWidth;
      gsap.set(track, { x: -currentIndexRef.current * cardWidth });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide timer
  useEffect(() => {
    const startTimer = () => {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = setInterval(() => {
        if (!isAnimating && !isHovered) {
          nextSlide();
        }
      }, 3000);
    };

    startTimer();

    return () => {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    };
  }, [isAnimating, isHovered, visibleCount]);

  return (
    <section ref={containerRef} className="py-8 sm:py-10 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 sm:mb-8 md:mb-10 drop-shadow-md">
          {t.title}
        </h2>
      </div>

      <div
        className="relative max-w-[1400px] mx-auto px-8 sm:px-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/30 hover:scale-110 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <i className="fas fa-chevron-left text-xl sm:text-2xl"></i>
        </button>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-5 md:gap-6 py-2"
            style={{ willChange: "transform" }}
          >
            {extendedOrgans.map((organ, idx) => {
              const iconSrc = organImages[organ.key];
              return (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[calc(50%-8px)] min-[475px]:w-[calc(33.333%-11px)] sm:w-[calc(33.333%-13px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
                >
                  <div
                    className="aspect-square rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center gap-3 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    style={{
                      background: `linear-gradient(145deg, ${organ.color}40, ${organ.color}20)`,
                      border: `2px solid ${organ.color}60`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center drop-shadow-lg">
                      {iconSrc && (
                        <img
                          src={iconSrc}
                          alt={organ.name}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <span className="text-white text-xs sm:text-sm md:text-base font-bold tracking-wide text-center drop-shadow-md">
                      {organ.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/30 hover:scale-110 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <i className="fas fa-chevron-right text-xl sm:text-2xl"></i>
        </button>
      </div>
    </section>
  );
};

export default OrganSlider;
