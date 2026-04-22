import React from "react";
import Headline from "../components/Headline";
import HeroSection from "../components/HeroSection";
import KeyBenefits from "../components/KeyBenefits";
import CTASection from "../components/CTASection";
import TrustElements from "../components/TrustElements";
import FAQ from "../components/FAQ";
import OrganCarousel from "../components/OrganCarousel";

// Remove CSS import: import "./LandingPage.css";

const LandingPage = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="bg-[#02c39a] min-h-screen">
      <div className="pt-2 sm:pt-4 lg:pt-6 px-2 sm:px-4 lg:px-6 sticky top-0 z-50">
        <nav className="bg-[#02c39a]/40 backdrop-blur-xl border border-white/30 rounded-full shadow-lg shadow-black/5 transition-all duration-300">
          <div className="px-3 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 transition-all duration-300">
            <div className="flex justify-between items-center max-w-[1400px] mx-auto">
              {/* Logo – icon only on mobile, text appears on sm+ */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-[#00a86b] to-[#0d98ba] rounded-lg sm:rounded-xl flex items-center justify-center shadow-md transition-all duration-300">
                  <i className="fas fa-heartbeat text-white text-base sm:text-lg md:text-xl"></i>
                </div>
                <h2 className="hidden sm:block text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight drop-shadow-sm transition-all duration-300">
                  Organ<span className="text-[#e8f5e9]">Track</span>
                </h2>
              </div>

              {/* Buttons – extra compact for 320px */}
              <div className="flex gap-1 sm:gap-2 md:gap-3 items-center transition-all duration-300">
                <button
                  className="text-white font-medium text-xs sm:text-sm md:text-base px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full transition-all duration-300 hover:bg-white/20 whitespace-nowrap"
                  onClick={() => handleNavigation("/login")}
                >
                  Log In
                </button>
                <button
                  className="bg-white text-[#00a86b] font-semibold text-xs sm:text-sm md:text-base px-2.5 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full shadow-md shadow-black/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00a86b]/20 border border-white whitespace-nowrap"
                  onClick={() => handleNavigation("/register")}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* Hero Section Wrapper */}
      <section className="pt-[90px] md:pt-[110px] relative">
        <Headline />
        <OrganCarousel />
        <HeroSection />
      </section>
      {/* Main Content with Green Background */}
      <div className="bg-gradient-to-br from-[#f8fff8] to-[#e8ffe8] py-10 md:py-16 rounded-t-[25px] md:rounded-t-[40px] mt-12 shadow-[0_-20px_60px_rgba(40,167,69,0.25),inset_0_1px_0_rgba(255,255,255,0.6)] border-t-4 border-[#28a745]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <KeyBenefits />
          <TrustElements />
          <CTASection />
          <FAQ />
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-[#00a896] text-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
              OrganTrack
            </h3>
            <p className="text-white/90 text-lg md:text-xl font-medium">
              Your health monitoring companion
            </p>
          </div>
          <div className="mt-12 pt-8 border-t-2 border-white/30">
            <p className="text-white/80 text-sm md:text-base">
              © 2026 OrganTrack. All rights reserved. For educational purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
