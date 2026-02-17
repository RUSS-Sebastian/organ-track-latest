import React from 'react';
import './TrustElements.css';

const TrustElements = () => {
  const testimonials = [
    {
      quote: "OrganTrack helped me identify early signs of liver stress. My doctor was impressed with the detailed reports.",
      author: "Phyu Sin Thant",
      role: "User for 8 months",
      rating: 5
    },
    {
      quote: "The daily organ check-ins have made me more aware of my health. The suggestions are practical and helpful.",
      author: "Thuta Kyaw",
      role: "Health-conscious user",
      rating: 5
    },
    {
      quote: "As someone with a family history of heart issues, this tool gives me peace of mind. Highly recommended!",
      author: "David Aung",
      role: "Proactive health monitor",
      rating: 5
    }
  ];

  const stats = [
    { value: "99%", label: "User Familier" },
    { value: "90%", label: "Reliability" },
    { value: "95%", label: "User Satisfaction" },
    { value: "24/7", label: "Monitoring" }
  ];

  return (
    <section className="trust-elements">
      <div className="trust-stats">
        <h4>Trusted by Health-Conscious Individuals</h4>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="testimonials">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Real experiences from people managing their organ health</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="stars">
                {'★'.repeat(testimonial.rating)}
              </div>
              <p className="quote">"{testimonial.quote}"</p>
              <div className="author-info">
                <div className="author-details">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="trust-badges">
          <div className="badge">
            <i className="fas fa-shield-alt"></i>
            <span>HIPAA Compliant</span>
          </div>
          <div className="badge">
            <i className="fas fa-lock"></i>
            <span>End-to-End Encryption</span>
          </div>
          <div className="badge">
            <i className="fas fa-user-md"></i>
            <span>Medical Advisory Board</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustElements;