import React from "react";

const KeyBenefits = () => {
  const benefits = [
    {
      icon: "fa-solid fa-calendar-check", // Daily Health Tracking
      title: "Daily Health Tracking",
      description:
        "Answer structured daily lifestyle questions on diet, sleep, stress, hydration, and habits. Our system analyzes your inputs using medical rule-based logic to evaluate organ impact and detect early risk patterns.",
      quote: "Small daily habits create big health outcomes.",
    },
    {
      icon: "fa-solid fa-stethoscope", // Organ-Specific Monitoring
      title: "Organ-Specific Monitoring",
      description:
        "Select a specific organ and answer symptom-tracking questions tailored to it. The system generates personalized risk levels, recommendations, warnings, and visual organ score trends to support early prevention.",
      quote: "Listen to your organs before they whisper into emergencies.",
    },
    {
      icon: "fa-solid fa-chart-simple", // Comprehensive Health Reports
      title: "Comprehensive Health Reports",
      description:
        "Generate detailed date-range reports including organ-wise scores, habit streaks, risk analysis, explanations, and overall health summaries — downloadable as structured PDF reports for tracking and sharing.",
      quote: "Records help us prevent risks.",
    },
  ];

  return (
    <section className="py-20 px-[10%] bg-gradient-to-br from-[#f8fff8] to-[#e8ffe8] text-center">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl text-[#1e5c3f] mb-3 font-bold">
          What Makes OrganTrack Special
        </h2>
        <p className="text-lg text-[#4f6f60] max-w-3xl mx-auto">
          Experience comprehensive organ health monitoring designed for
          proactive wellness
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white p-8 md:p-9 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
          >
            <div className="text-5xl mb-5">
              <i className={`${benefit.icon} text-[#00a86b]`}></i>
            </div>
            <h3 className="text-xl md:text-2xl text-[#1e5c3f] mb-4 font-bold">
              {benefit.title}
            </h3>
            <p className="text-base text-[#4f6f60] leading-relaxed text-center mb-6">
              {benefit.description}
            </p>
            <div className="inline-block max-w-[90%] mt-3 italic text-[15px] text-[#2e7d5b] bg-[#e8f5ef] px-5 py-3 rounded-xl relative">
              <span className="text-xl text-[#1e5c3f] font-bold">“</span>
              {benefit.quote}
              <span className="text-xl text-[#1e5c3f] font-bold">”</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyBenefits;
