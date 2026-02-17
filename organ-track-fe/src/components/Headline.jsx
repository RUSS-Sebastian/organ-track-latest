import React from 'react';
import './Headline.css';

const Headline = () => {
  return (
    <div className="headline-container">
      <h1 className="main-headline">
        Track Your Organ Health with Precision
      </h1>
      <p className="subheadline">
        Monitor organ function, get personalized insights, and maintain optimal health through daily check-ins
      </p>
      <div className="headline-stats">
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Health Monitoring</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">10+</span>
          <span className="stat-label">Organs Tracked</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">98%</span>
          <span className="stat-label">User Satisfaction</span>
        </div>
      </div>
    </div>
  );
};

export default Headline;