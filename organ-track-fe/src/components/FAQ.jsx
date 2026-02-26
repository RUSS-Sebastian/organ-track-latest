import React, { useState } from "react";
import "./FAQ.css";

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
    <section className="faq-section">
      <div className="section-header">
        <h2>Frequently Asked Questions</h2>
        <p>Get started with OrganTrack in minutes</p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="toggle-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-contact">
        <p>Ready to start your organ health journey?</p>
        <button
          className="contact-button"
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
