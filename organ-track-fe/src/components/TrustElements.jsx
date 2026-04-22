import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TrustElements = () => {
  const container = useRef();

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

  const testimonials = [
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
  ];

  const stats = [
    { value: "99", suffix: "%", label: "User Familiar" },
    { value: "90", suffix: "%", label: "Reliability" },
    { value: "95", suffix: "%", label: "User Satisfaction" },
    { value: "24", suffix: "/7", label: "Monitoring" },
  ];

  return (
    <section ref={container} className="py-20 px-5">
      {/* Stats Section */}
      <div className="mb-16">
        <h4 className="text-center text-[#4a6b73] mb-10 text-base uppercase tracking-[2px] font-semibold">
          Trusted by Health-Conscious Individuals
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 max-w-[1000px] mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-5 md:p-8 bg-gradient-to-br from-[#e8f5e9] to-[#f1f8e9] rounded-2xl shadow-[0_8px_20px_rgba(0,168,107,0.1)]"
            >
              <div
                className="stat-value text-4xl md:text-5xl font-extrabold text-[#00a86b] mb-2"
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                0
              </div>
              <div className="text-xs md:text-sm text-[#4a6b73] uppercase tracking-[1px] font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl text-[#1e5c3f] font-bold mb-2">
            What Our Users Say
          </h2>
          <p className="text-lg text-[#4f6f60]">
            Real experiences from people managing their organ health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#fafdfb] p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,168,107,0.08)] border border-[#e0f2e9] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(0,168,107,0.12)]"
            >
              <div className="text-[#ffd700] text-xl mb-6">
                {"★".repeat(testimonial.rating)}
              </div>
              <p className="text-base md:text-lg leading-relaxed text-[#1a535c] italic mb-7 pl-4 border-l-4 border-[#00a86b]">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <strong className="text-[#1a535c] text-base">
                    {testimonial.author}
                  </strong>
                  <span className="text-[#4a6b73] text-sm">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center flex-wrap gap-4 md:gap-6 mt-12">
          <div className="flex items-center gap-3 px-5 py-4 md:px-7 md:py-5 bg-[#fafdfb] rounded-xl border border-[#e0f2e9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a86b]">
            <i className="fas fa-shield-alt text-[#00a86b] text-2xl"></i>
            <span className="font-semibold text-[#1a535c] text-sm">
              HIPAA Compliant
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 py-4 md:px-7 md:py-5 bg-[#fafdfb] rounded-xl border border-[#e0f2e9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a86b]">
            <i className="fas fa-lock text-[#00a86b] text-2xl"></i>
            <span className="font-semibold text-[#1a535c] text-sm">
              End-to-End Encryption
            </span>
          </div>
          <div className="flex items-center gap-3 px-5 py-4 md:px-7 md:py-5 bg-[#fafdfb] rounded-xl border border-[#e0f2e9] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00a86b]">
            <i className="fas fa-user-md text-[#00a86b] text-2xl"></i>
            <span className="font-semibold text-[#1a535c] text-sm">
              Medical Advisory Board
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustElements;
