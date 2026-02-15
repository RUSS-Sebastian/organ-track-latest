import React from 'react';
import Headline from '../components/Headline';
import HeroSection from '../components/HeroSection';
import KeyBenefits from '../components/KeyBenefits';
import CTASection from '../components/CTASection';
import TrustElements from '../components/TrustElements';
import FAQ from '../components/FAQ';
import './LandingPage.css';

const LandingPage = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="landing-page">
      {/* Vivid Green Transparent Navigation */}
      <nav className="top-navbar vivid-green-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>OrganTrack</h2>
          </div>
          <div className="nav-links">
            <button className="nav-link features-btn" onClick={() => handleNavigation('/features')}>
              Features
            </button>
            <button className="nav-link contact-btn" onClick={() => handleNavigation('/contact')}>
              Contact
            </button>
            <button className="nav-link login-btn" onClick={() => handleNavigation('/login')}>
              Log In
            </button>
            <button className="nav-link register-btn" onClick={() => handleNavigation('/register')}>
              Register Now
            </button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="hero-section">
        <Headline />
        <HeroSection />
      </section>
      
      {/* Main Content with Vivid Green Background */}
      <div className="main-content vivid-green-bg">
        <div className="container">
          <KeyBenefits />
          <TrustElements />
          <CTASection />
          <FAQ />
        </div>
      </div>
      
      {/* Vivid Green Footer */}
      <footer className="footer vivid-green-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>OrganTrack</h3>
            <p>Your health monitoring companion</p>
          </div>
          <div className="footer-copyright">
            <p>© 2026 OrganTrack. All rights reserved. For educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;