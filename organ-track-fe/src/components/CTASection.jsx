import React, { useState } from 'react';
import './CTASection.css';

const CTASection = () => {
  const [ctaHover, setCtaHover] = useState(false);

  const handleGetStarted = () => {
    // Navigate directly to organ selection/dashboard
    window.location.href = '/dashboard';
  };

  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2>Start Tracking Your Organ Health Today</h2>
        
        <div className="cta-buttons">
          <button 
            className="cta-primary"
            onClick={handleGetStarted}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >
            Start Tracking Now
            <i className={`fas fa-arrow-right ${ctaHover ? 'animate' : ''}`}></i>
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default CTASection;
