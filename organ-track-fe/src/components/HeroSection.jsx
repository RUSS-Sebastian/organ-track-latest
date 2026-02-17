import React from 'react';
import './HeroSection.css';
import doctorImage from '../assets/doctor-image.png';

const HeroSection = () => {
  return (
    <section className="hero-visual-section">
      <div className="hero-content">
        <div className="hero-visual">
          <div className="organ-visualization">
            {/* Main Organ Grid */}
            <div className="organ-grid">
              <div className="organ-item heart">
                <div className="organ-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <span className="organ-label">Heart</span>
              </div>
              
              <div className="organ-item lungs">
                <div className="organ-icon">
                  <i className="fas fa-lungs"></i>
                </div>
                <span className="organ-label">Lungs</span>
              </div>
              
              <div className="organ-item liver">
                <div className="organ-icon">
                  <i className="fas fa-prescription-bottle"></i>
                </div>
                <span className="organ-label">Liver</span>
              </div>
              
              <div className="organ-item kidney">
                <div className="organ-icon">
                  <i className="fas fa-filter"></i>
                </div>
                <span className="organ-label">Kidney</span>
              </div>
              
              <div className="organ-item brain">
                <div className="organ-icon">
                  <i className="fas fa-brain"></i>
                </div>
                <span className="organ-label">Brain</span>
              </div>
              
              <div className="organ-item stomach">
                <div className="organ-icon">
                  <i className="fas fa-tint"></i> {/* Fixed: Changed from fa-stomach to fa-tint */}
                </div>
                <span className="organ-label">Stomach</span>
              </div>
              
              <div className="organ-item eye">
                <div className="organ-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <span className="organ-label">Eyes</span>
              </div>
              
              <div className="organ-item skin">
                <div className="organ-icon">
                  <i className="fas fa-hand-sparkles"></i>
                </div>
                <span className="organ-label">Skin</span>
              </div>
            </div>
            
            {/* Doctor/Medical Professional Section */}
            <div className="doctor-section">
              <div className="doctor-visual">
                <img src={doctorImage} alt="Medical Professional" className="doctor-image" />
              </div>
              
              <div className="doctor-content">
                <h3 className="doctor-title">
                  <i className="fas fa-shield-alt"></i>
                  Medical Advisory Supported
                </h3>
                <p className="doctor-description">
                  Our organ tracking algorithms are reviewed by healthcare professionals 
                  to ensure accurate, reliable health monitoring.
                </p>
                
                <div className="medical-features">
                  <div className="medical-feature">
                    <i className="fas fa-check-circle"></i>
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="medical-feature">
                    <i className="fas fa-check-circle"></i>
                    <span>Doctor Reviewed</span>
                  </div>
                  <div className="medical-feature">
                    <i className="fas fa-check-circle"></i>
                    <span>Evidence-Based</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-text">
          <h1>Professional Organ Health Tracking</h1>
          <p className="hero-subtitle">
            Monitor your vital organs with medical-grade precision. 
            Get insights that help you make informed health decisions.
          </p>
          
          <div className="hero-features">
            <div className="feature">
              <i className="fas fa-check-circle"></i>
              <span>Medical advisory supported</span>
            </div>
            <div className="feature">
              <i className="fas fa-check-circle"></i>
              <span>Clinical accuracy standards</span>
            </div>
            <div className="feature">
              <i className="fas fa-check-circle"></i>
              <span>Professional health reports</span>
            </div>
            <div className="feature">
              <i className="fas fa-check-circle"></i>
              <span>Secure & confidential</span>
            </div>
          </div>
          
          <div className="hero-actions">
            <button className="hero-cta primary" onClick={() => window.location.href = '/dashboard'}>
              <i className="fas fa-play-circle"></i>
              Start Monitoring
            </button>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;