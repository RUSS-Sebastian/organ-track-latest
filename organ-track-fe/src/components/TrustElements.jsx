import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TrustElements = () => {
  const container = useRef();
  const sliderTrackRef = useRef(null);
  const [visibleSlides, setVisibleSlides] = useState(3);

  // Count-up animation (unchanged)
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
    { scope: container },
  );

  // 15 testimonials
  const allTestimonials = [
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
      quote: "The PDF reports are perfect for sharing with my healthcare team.",
      author: "Andrew Taylor",
      role: "Chronic condition manager",
      rating: 5,
    },
  ];

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

  useGSAP(() => {
    const track = sliderTrackRef.current;
    if (!track) return;
    const cardWidth = getCardWidth();
    cardWidthRef.current = cardWidth;
    gsap.set(track, { x: -startIndex * cardWidth });
    currentIndexRef.current = startIndex;
  }, [visibleSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating.current) nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [visibleSlides]);

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

  const stats = [
    { value: "99", suffix: "%", label: "User Familiar" },
    { value: "90", suffix: "%", label: "Reliability" },
    { value: "95", suffix: "%", label: "User Satisfaction" },
    { value: "24", suffix: "/7", label: "Monitoring" },
  ];

  return (
    <section
      ref={container}
      className="py-16 sm:py-20 px-3 sm:px-5 overflow-hidden"
    >
      {/* Stats Section – unchanged but with smaller padding on mobile */}
      <div className="mb-12 sm:mb-16">
        <h4 className="text-center text-[#4a6b73] mb-8 sm:mb-10 text-sm sm:text-base uppercase tracking-[2px] font-semibold">
          Trusted by Health-Conscious Individuals
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
            What Our Users Say
          </h2>
          <p className="text-base sm:text-lg text-[#4f6f60] px-4">
            Real experiences from people managing their organ health
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Left Arrow – hidden on very small screens if needed, but we keep it with smaller size */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur rounded-full shadow-md flex items-center justify-center text-[#00a86b] hover:bg-white transition"
            aria-label="Previous testimonials"
          >
            <i className="fas fa-chevron-left text-sm sm:text-base"></i>
          </button>

          {/* Track Wrapper – reduced side padding on mobile */}
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

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur rounded-full shadow-md flex items-center justify-center text-[#00a86b] hover:bg-white transition"
            aria-label="Next testimonials"
          >
            <i className="fas fa-chevron-right text-sm sm:text-base"></i>
          </button>
        </div>

        {/* Trust Badges – stacked on mobile, smaller padding */}
        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 md:gap-6 mt-10 sm:mt-12">
          <div className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-4 md:px-7 md:py-5 bg-[#fafdfb] rounded-xl border border-[#e0f2e9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a86b]">
            <i className="fas fa-shield-alt text-[#00a86b] text-lg sm:text-xl md:text-2xl"></i>
            <span className="font-semibold text-[#1a535c] text-xs sm:text-sm">
              HIPAA Compliant
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-4 md:px-7 md:py-5 bg-[#fafdfb] rounded-xl border border-[#e0f2e9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a86b]">
            <i className="fas fa-lock text-[#00a86b] text-lg sm:text-xl md:text-2xl"></i>
            <span className="font-semibold text-[#1a535c] text-xs sm:text-sm">
              End-to-End Encryption
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-4 md:px-7 md:py-5 bg-[#fafdfb] rounded-xl border border-[#e0f2e9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a86b]">
            <i className="fas fa-user-md text-[#00a86b] text-lg sm:text-xl md:text-2xl"></i>
            <span className="font-semibold text-[#1a535c] text-xs sm:text-sm">
              Medical Advisory Board
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustElements;
