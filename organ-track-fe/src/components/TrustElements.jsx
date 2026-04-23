import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Translations object
const translations = {
  en: {
    statsTitle: "Trusted by Health-Conscious Individuals",
    stats: [
      { value: "99", suffix: "%", label: "User Familiar" },
      { value: "90", suffix: "%", label: "Reliability" },
      { value: "95", suffix: "%", label: "User Satisfaction" },
      { value: "24", suffix: "/7", label: "Monitoring" },
    ],
    testimonialsTitle: "What Our Users Say",
    testimonialsSubtitle:
      "Real experiences from people managing their organ health",
    testimonials: [
      {
        quote:
          "OrganTrack helped me identify early signs of liver stress. My doctor was impressed with the detailed reports.",
        author: "Phyu Sin Thant",
        role: "User for 8 months",
        rating: 5,
      },
      {
        quote:
          "The daily organ check-ins have made me more aware of my health. The suggestions are practical and helpful.",
        author: "Thuta Kyaw",
        role: "Health-conscious user",
        rating: 5,
      },
      {
        quote:
          "As someone with a family history of heart issues, this tool gives me peace of mind. Highly recommended!",
        author: "David Aung",
        role: "Proactive health monitor",
        rating: 5,
      },
      {
        quote:
          "I love how easy it is to track multiple organs. The reports are clear and my doctor loves them.",
        author: "Sarah Chen",
        role: "User for 3 months",
        rating: 5,
      },
      {
        quote:
          "The hydration and sleep tracking features helped me improve my kidney health noticeably.",
        author: "Michael Rodriguez",
        role: "Fitness enthusiast",
        rating: 5,
      },
      {
        quote:
          "After my surgery, OrganTrack gave me confidence that my liver was recovering well.",
        author: "Emma Thompson",
        role: "Post-op patient",
        rating: 4,
      },
      {
        quote:
          "The reminders keep me consistent. I've never been more in tune with my body.",
        author: "James Wilson",
        role: "Busy professional",
        rating: 5,
      },
      {
        quote:
          "I appreciate the evidence‑based recommendations. It feels like having a health coach.",
        author: "Linda Park",
        role: "Wellness advocate",
        rating: 5,
      },
      {
        quote:
          "The organ score trends are a game‑changer. I can see my progress over months.",
        author: "Robert Kim",
        role: "Long‑term user",
        rating: 5,
      },
      {
        quote:
          "As a senior, this tool helps me monitor my heart and lungs without constant doctor visits.",
        author: "Margaret Lee",
        role: "Retired nurse",
        rating: 5,
      },
      {
        quote:
          "The UI is clean and intuitive. I recommended it to my whole family.",
        author: "Daniel Garcia",
        role: "Tech reviewer",
        rating: 4,
      },
      {
        quote:
          "Tracking my stress levels alongside organ health gave me insights I never had before.",
        author: "Olivia Martinez",
        role: "Mental health advocate",
        rating: 5,
      },
      {
        quote:
          "I was skeptical at first, but the accuracy of the risk alerts is impressive.",
        author: "Christopher White",
        role: "Data analyst",
        rating: 5,
      },
      {
        quote:
          "OrganTrack motivated me to drink more water and sleep better. My skin and kidneys thank me!",
        author: "Sophia Brown",
        role: "Beauty & wellness blogger",
        rating: 5,
      },
      {
        quote:
          "The PDF reports are perfect for sharing with my healthcare team.",
        author: "Andrew Taylor",
        role: "Chronic condition manager",
        rating: 5,
      },
    ],
    badges: {
      hipaa: "HIPAA Compliant",
      encryption: "End-to-End Encryption",
      medicalBoard: "Medical Advisory Board",
    },
  },
  mm: {
    statsTitle: "ကျန်းမာရေးအသိရှိသူများ၏ ယုံကြည်မှုကိုရရှိထားသည်",
    stats: [
      { value: "99", suffix: "%", label: "အသုံးပြုသူ ရင်းနှီးမှု" },
      { value: "90", suffix: "%", label: "ယုံကြည်စိတ်ချရမှု" },
      { value: "95", suffix: "%", label: "သုံးစွဲသူ စိတ်ကျေနပ်မှု" },
      { value: "24", suffix: "/၇", label: "စောင့်ကြည့်မှု" },
    ],
    testimonialsTitle: "သုံးစွဲသူများ၏ ပြောစကား",
    testimonialsSubtitle:
      "သူတို့၏ အင်္ဂါကျန်းမာရေးကို စီမံခန့်ခွဲနေသော တကယ့်အတွေ့အကြုံများ",
    testimonials: [
      {
        quote:
          "OrganTrack က အသည်းအဆီဖုံးခြင်းရဲ့ အစောပိုင်းလက္ခဏာတွေကို သတိထားမိအောင် ကူညီပေးခဲ့တယ်။ အသေးစိတ်အစီရင်ခံစာတွေကို ဆရာဝန်ကလည်း သဘောကျတယ်။",
        author: "ဖြူစင်သန့်",
        role: "၈ လကြာ အသုံးပြုသူ",
        rating: 5,
      },
      {
        quote:
          "နေ့စဉ် အင်္ဂါစစ်ဆေးမှုတွေက ကျွန်မရဲ့ ကျန်းမာရေးကို ပိုသတိထားမိလာစေတယ်။ အကြံပြုချက်တွေက လက်တွေ့ကျပြီး အထောက်အကူဖြစ်တယ်။",
        author: "သူတကို",
        role: "ကျန်းမာရေးအသိရှိသုံးစွဲသူ",
        rating: 5,
      },
      {
        quote:
          "နှလုံးရောဂါ မိသားစုရာဇဝင်ရှိတဲ့သူအနေနဲ့ ဒီကိရိယာက စိတ်အေးချမ်းမှုပေးတယ်။ အထူးအကြံပြုလိုက်တာ။",
        author: "ဒေးဗစ်အောင်",
        role: "ကြိုတင်ကာကွယ်စောင့်ကြည့်သူ",
        rating: 5,
      },
      {
        quote:
          "အင်္ဂါအများအပြားကို အလွယ်တကူစောင့်ကြည့်နိုင်လို့ အရမ်းကြိုက်တယ်။ အစီရင်ခံစာတွေက ရှင်းလင်းပြီး ငါ့ဆရာဝန်က သူတို့ကို သဘောကျတယ်။",
        author: "ဆာရာချန်",
        role: "၃ လ အသုံးပြုသူ",
        rating: 5,
      },
      {
        quote:
          "ရေဓာတ်နဲ့ အိပ်စက်မှုစောင့်ကြည့်တဲ့ လုပ်ဆောင်ချက်တွေက ကျောက်ကပ်ကျန်းမာရေးကို သိသိသာသာ တိုးတက်စေတယ်။",
        author: "မိုက်ကယ်ရိုဒရီဂွက်ဇ်",
        role: "ကြံ့ခိုင်ရေးဝါသနာရှင်",
        rating: 5,
      },
      {
        quote:
          "ခွဲစိတ်မှုအပြီးမှာ OrganTrack က ကျွန်မရဲ့အသည်း ပြန်လည်ကောင်းမွန်နေတယ်ဆိုတဲ့ ယုံကြည်ချက်ကို ပေးတယ်။",
        author: "အမ်မာသွန်ပဆင်",
        role: "ခွဲစိတ်လူနာ",
        rating: 4,
      },
      {
        quote:
          "သတိပေးချက်တွေက ငါ့ကို တည်ငြိမ်စေတယ်။ ငါ့ခန္ဓာကိုယ်နဲ့ ဒီလောက်ထိ ထိတွေ့နေတာ တခါမှ မရှိဘူး။",
        author: "ဂျိမ်းစ်ဝီလ်ဆင်",
        role: "အလုပ်ရှုပ်သော ပညာရှင်",
        rating: 5,
      },
      {
        quote:
          "အထောက်အထားအခြေပြု အကြံပြုချက်တွေကို ကျွန်မ သဘောကျတယ်။ ကျန်းမာရေးနည်းပြတစ်ယောက်ရှိတဲ့အတိုင်းပဲ။",
        author: "လင်ဒါပတ်ခ်",
        role: "ကျန်းမာရေးထောက်ခံသူ",
        rating: 5,
      },
      {
        quote:
          "အင်္ဂါရမှတ် လမ်းကြောင်းတွေက ဂိမ်းအပြောင်းအလဲတစ်ခု။ လအတော်ကြာတဲ့ ငါ့ရဲ့တိုးတက်မှုကို မြင်နိုင်တယ်။",
        author: "ရောဘတ်ကင်မ်",
        role: "ရေရှည်အသုံးပြုသူ",
        rating: 5,
      },
      {
        quote:
          "သက်ကြီးရွယ်အိုတစ်ယောက်အနေနဲ့ ဒီကိရိယာက အဆက်မပြတ်ဆရာဝန်ဆီ သွားစရာမလိုဘဲ နှလုံးနဲ့ အဆုတ်ကို စောင့်ကြည့်ဖို့ ကူညီပေးတယ်။",
        author: "မာဂရက်လီ",
        role: "အငြိမ်းစားသူနာပြု",
        rating: 5,
      },
      {
        quote:
          "UI က ရှင်းလင်းပြီး အသုံးပြုရလွယ်တယ်။ ကျွန်တော့်မိသားစုတစ်ခုလုံးကို အကြံပြုခဲ့တယ်။",
        author: "ဒန်နီယယ်ဂါစီယာ",
        role: "နည်းပညာသုံးသပ်သူ",
        rating: 4,
      },
      {
        quote:
          "စိတ်ဖိစီးမှုအဆင့်တွေကို အင်္ဂါကျန်းမာရေးနဲ့အတူ စောင့်ကြည့်တာက အရင်က မရခဲ့ဖူးတဲ့ ထိုးထွင်းသိမြင်မှုတွေ ပေးတယ်။",
        author: "အိုလီဗီယာမာတီနက်ဇ်",
        role: "စိတ်ကျန်းမာရေးထောက်ခံသူ",
        rating: 5,
      },
      {
        quote:
          "အစပိုင်းမှာ သံသယရှိခဲ့ပေမယ့် အန္တရာယ်သတိပေးချက်တွေရဲ့ တိကျမှုက အံ့ဩစရာပဲ။",
        author: "ခရစ္စတိုဖာဝှိုက်",
        role: "ဒေတာသုံးသပ်သူ",
        rating: 5,
      },
      {
        quote:
          "OrganTrack က ရေပိုသောက်ဖို့နဲ့ အိပ်ရေးဝအောင်အိပ်ဖို့ လှုံ့ဆော်ပေးတယ်။ အသားအရေနဲ့ ကျောက်ကပ်က ကျေးဇူးတင်နေတယ်။",
        author: "ဆိုဖီယာဘရောင်း",
        role: "အလှအပနှင့် ကျန်းမာရေးဘလော့ဂါ",
        rating: 5,
      },
      {
        quote:
          "PDF အစီရင်ခံစာတွေက ကျန်းမာရေးစောင့်ကြည့်ရေးအဖွဲ့နဲ့ မျှဝေဖို့ အကောင်းဆုံးပဲ။",
        author: "အင်ဒရူးတေလာ",
        role: "နာတာရှည်ရောဂါမန်နေဂျာ",
        rating: 5,
      },
    ],
    badges: {
      hipaa: "HIPAA လိုက်နာမှု",
      encryption: "အဆုံးမှအဆုံး ကုဒ်ပြောင်းခြင်း",
      medicalBoard: "ဆေးဘက်ဆိုင်ရာအကြံပေးဘုတ်အဖွဲ့",
    },
  },
};

const TrustElements = ({ language = "en" }) => {
  const container = useRef();
  const sliderTrackRef = useRef(null);
  const [visibleSlides, setVisibleSlides] = useState(3);

  const t = translations[language] || translations.en;
  const stats = t.stats;
  const allTestimonials = t.testimonials;

  // Count-up animation
  useGSAP(
    () => {
      const counters = gsap.utils.toArray(".stat-value");
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
    { scope: container, dependencies: [language] },
  );

  const updateVisibleSlides = () => {
    const width = window.innerWidth;
    if (width < 640) setVisibleSlides(1);
    else if (width < 1024) setVisibleSlides(2);
    else setVisibleSlides(3);
  };

  useEffect(() => {
    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  const extendedTestimonials = [
    ...allTestimonials.slice(-visibleSlides),
    ...allTestimonials,
    ...allTestimonials.slice(0, visibleSlides),
  ];

  const totalOriginal = allTestimonials.length;
  const startIndex = visibleSlides;
  const currentIndexRef = useRef(startIndex);
  const cardWidthRef = useRef(0);
  const autoSlideTimer = useRef(null);
  const isAnimating = useRef(false);

  const getCardWidth = () => {
    if (!sliderTrackRef.current) return 0;
    const firstCard = sliderTrackRef.current.children[startIndex];
    if (!firstCard) return 0;
    const cardRect = firstCard.getBoundingClientRect();
    const trackStyle = window.getComputedStyle(sliderTrackRef.current);
    const gap = parseFloat(trackStyle.gap) || 32;
    return cardRect.width + gap;
  };

  const goToIndex = (newIndex) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const track = sliderTrackRef.current;
    const cardWidth = getCardWidth();
    cardWidthRef.current = cardWidth;
    const distance = -newIndex * cardWidth;
    gsap.to(track, {
      x: distance,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        let adjustedIndex = newIndex;
        if (newIndex >= startIndex + totalOriginal) {
          adjustedIndex = startIndex;
        } else if (newIndex < startIndex) {
          adjustedIndex = startIndex + totalOriginal - 1;
        }
        if (adjustedIndex !== newIndex) {
          gsap.set(track, { x: -adjustedIndex * cardWidth });
        }
        currentIndexRef.current = adjustedIndex;
        isAnimating.current = false;
      },
    });
  };

  const nextSlide = () => {
    if (isAnimating.current) return;
    goToIndex(currentIndexRef.current + 1);
  };

  const prevSlide = () => {
    if (isAnimating.current) return;
    goToIndex(currentIndexRef.current - 1);
  };

  useGSAP(
    () => {
      const track = sliderTrackRef.current;
      if (!track) return;
      const cardWidth = getCardWidth();
      cardWidthRef.current = cardWidth;
      gsap.set(track, { x: -startIndex * cardWidth });
      currentIndexRef.current = startIndex;
    },
    { dependencies: [visibleSlides, language] },
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating.current) nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [visibleSlides, language]);

  useEffect(() => {
    const handleResize = () => {
      const track = sliderTrackRef.current;
      if (!track) return;
      const cardWidth = getCardWidth();
      cardWidthRef.current = cardWidth;
      gsap.set(track, { x: -currentIndexRef.current * cardWidth });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={container}
      className="py-16 sm:py-20 px-3 sm:px-5 overflow-hidden"
    >
      {/* Stats Section */}
      <div className="mb-12 sm:mb-16">
        <h4 className="text-center text-[#4a6b73] mb-8 sm:mb-10 text-sm sm:text-base uppercase tracking-[2px] font-semibold">
          {t.statsTitle}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-8 max-w-[1000px] mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-5 md:p-8 bg-gradient-to-br from-[#e8f5e9] to-[#f1f8e9] rounded-2xl shadow-[0_8px_20px_rgba(0,168,107,0.1)]"
            >
              <div
                className="stat-value text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#00a86b] mb-1 sm:mb-2"
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                0
              </div>
              <div className="text-xs sm:text-sm text-[#4a6b73] uppercase tracking-[1px] font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Slider */}
      <div>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1e5c3f] font-bold mb-2">
            {t.testimonialsTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#4f6f60] px-4">
            {t.testimonialsSubtitle}
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur rounded-full shadow-md flex items-center justify-center text-[#00a86b] hover:bg-white transition"
            aria-label="Previous testimonials"
          >
            <i className="fas fa-chevron-left text-sm sm:text-base"></i>
          </button>

          <div className="overflow-hidden px-8 sm:px-12">
            <div
              ref={sliderTrackRef}
              className="flex gap-4 sm:gap-6 lg:gap-8 py-4"
              style={{ willChange: "transform" }}
            >
              {extendedTestimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-21.333px)]"
                >
                  <div className="bg-[#fafdfb] p-4 sm:p-6 md:p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,168,107,0.08)] border border-[#e0f2e9] h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(0,168,107,0.12)]">
                    <div className="text-[#ffd700] text-lg sm:text-xl mb-4 sm:mb-6">
                      {"★".repeat(testimonial.rating)}
                    </div>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#1a535c] italic mb-5 sm:mb-7 pl-3 sm:pl-4 border-l-4 border-[#00a86b]">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <strong className="text-[#1a535c] text-sm sm:text-base">
                          {testimonial.author}
                        </strong>
                        <span className="text-[#4a6b73] text-xs sm:text-sm">
                          {testimonial.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur rounded-full shadow-md flex items-center justify-center text-[#00a86b] hover:bg-white transition"
            aria-label="Next testimonials"
          >
            <i className="fas fa-chevron-right text-sm sm:text-base"></i>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 md:gap-6 mt-10 sm:mt-12">
          <div className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-4 md:px-7 md:py-5 bg-[#fafdfb] rounded-xl border border-[#e0f2e9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a86b]">
            <i className="fas fa-shield-alt text-[#00a86b] text-lg sm:text-xl md:text-2xl"></i>
            <span className="font-semibold text-[#1a535c] text-xs sm:text-sm">
              {t.badges.hipaa}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-4 md:px-7 md:py-5 bg-[#fafdfb] rounded-xl border border-[#e0f2e9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a86b]">
            <i className="fas fa-lock text-[#00a86b] text-lg sm:text-xl md:text-2xl"></i>
            <span className="font-semibold text-[#1a535c] text-xs sm:text-sm">
              {t.badges.encryption}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-4 md:px-7 md:py-5 bg-[#fafdfb] rounded-xl border border-[#e0f2e9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a86b]">
            <i className="fas fa-user-md text-[#00a86b] text-lg sm:text-xl md:text-2xl"></i>
            <span className="font-semibold text-[#1a535c] text-xs sm:text-sm">
              {t.badges.medicalBoard}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustElements;
