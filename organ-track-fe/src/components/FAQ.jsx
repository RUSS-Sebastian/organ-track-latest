import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
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
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 px-5 max-w-[900px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-[#1e5c3f] font-bold mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-[#4f6f60]">
          Get started with OrganTrack in minutes
        </p>
      </div>

      <div className="space-y-4">
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
            <div className="flex justify-between items-center p-5 md:p-6 bg-[#f8fdf9]">
              <h3 className="text-base md:text-lg text-[#1a535c] font-semibold flex-1 pr-5">
                {faq.question}
              </h3>
              <span
                className={`text-3xl text-[#00a86b] font-light min-w-[24px] text-center transition-transform duration-300 ${
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
              <p className="text-[#4a6b73] leading-relaxed text-sm md:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16 p-8 md:p-10 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] rounded-2xl border-2 border-[#00a86b]">
        <p className="text-xl md:text-2xl text-[#1a535c] mb-6 font-medium">
          Ready to start your organ health journey?
        </p>
        <button
          className="w-full md:w-auto bg-gradient-to-r from-[#00a86b] to-[#0d98ba] text-white border-none py-4 px-8 md:py-5 md:px-9 text-base md:text-lg rounded-full cursor-pointer inline-flex items-center justify-center gap-3 transition-all duration-300 font-semibold shadow-[0_8px_20px_rgba(0,168,107,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,168,107,0.4)]"
          onClick={() => (window.location.href = "/login")}
        >
          <i className="fas fa-heartbeat"></i>
          Start Tracking Now
        </button>
      </div>
    </section>
  );
};

export default FAQ;
