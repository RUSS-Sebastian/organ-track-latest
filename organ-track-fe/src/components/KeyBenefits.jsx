import React from 'react';
import './KeyBenefits.css';

const KeyBenefits = () => {
  const benefits = [
    {
      icon: '❤️',
      title: 'Daily Health Tracking',
      description:
        'Answer structured daily lifestyle questions on diet, sleep, stress, hydration, and habits. Our system analyzes your inputs using medical rule-based logic to evaluate organ impact and detect early risk patterns.',
      quote: 'Small daily habits create big health outcomes.'
    },
    {
      icon: '🦴',
      title: 'Organ-Specific Monitoring',
      description:
        'Select a specific organ and answer symptom-tracking questions tailored to it. The system generates personalized risk levels, recommendations, warnings, and visual organ score trends to support early prevention.',
      quote: 'Listen to your organs before they whisper into emergencies.'
    },
    {
      icon: '📊',
      title: 'Comprehensive Health Reports',
      description:
        'Generate detailed date-range reports including organ-wise scores, habit streaks, risk analysis, explanations, and overall health summaries — downloadable as structured PDF reports for tracking and sharing.',
      quote: 'Records help us prevent risks.'
    }
  ];

  return (
    <section className="key-benefits">
      <div className="section-header">
        <h2>What Makes OrganTrack Special</h2>
        <p>
          Experience comprehensive organ health monitoring designed for proactive wellness
        </p>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="benefit-icon">{benefit.icon}</div>

            <h3>{benefit.title}</h3>

            <p className="benefit-description">
              {benefit.description}
            </p>

            <div className="benefit-quote">
              <span className="quote-mark">“</span>
              {benefit.quote}
              <span className="quote-mark">”</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyBenefits;
