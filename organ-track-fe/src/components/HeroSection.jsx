import React from "react";
import doctorImage from "../assets/doctor-image.png";

const HeroSection = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-5 py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column - Doctor Card */}
        <div className="order-2 lg:order-1">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 md:p-8 border border-white/40 shadow-xl max-w-md lg:max-w-none mx-auto">
            <div className="flex flex-col items-center text-center">
              {/* Doctor Image - centered above text */}
              <div className="mb-4">
                <img
                  src={doctorImage}
                  alt="Medical Professional"
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain drop-shadow-lg"
                />
              </div>

              {/* Doctor Info */}
              <h3 className="text-[#1a535c] text-xl sm:text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-0.5">
                <span>Medical Advisory Supported</span>
              </h3>
              <p className="text-[#4a6b73] text-sm sm:text-base leading-relaxed mb-4 max-w-md">
                Our organ tracking algorithms are reviewed by healthcare
                professionals to ensure accurate, reliable health monitoring.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge>HIPAA Compliant</Badge>
                <Badge>Doctor Reviewed</Badge>
                <Badge>Evidence-Based</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Text & CTA */}
        <div className="order-1 lg:order-2">
          {/* Container with max-width and auto margins for balanced centering */}
          <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-auto lg:mr-0 text-center lg:text-left">
            {/* Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg lg:text-center">
              Professional Organ Health Tracking
            </h1>

            {/* Subheadline */}
            <p className="text-base xs:text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed lg:text-center">
              Monitor your vital organs with medical-grade precision. Get
              insights that help you make informed health decisions.
            </p>

            {/* Features Grid – centered on all screens */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 mb-6 sm:mb-8 max-w-md lg:max-w-xl mx-auto">
              <FeatureItem>Medical advisory supported</FeatureItem>
              <FeatureItem>Clinical accuracy standards</FeatureItem>
              <FeatureItem>Professional health reports</FeatureItem>
              <FeatureItem>Secure & confidential</FeatureItem>
            </div>

            {/* CTA Button – centered */}
            <div className="flex justify-center lg:justify-center">
              <button
                onClick={() => (window.location.href = "/login")}
                className="bg-white text-[#00a86b] font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <i className="fas fa-play-circle"></i>
                Start Monitoring
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper components
const Badge = ({ children }) => (
  <div className="flex items-center gap-1.5 text-[#1a535c] text-xs sm:text-sm font-medium px-3 py-1.5 bg-[rgba(0,168,107,0.1)] rounded-full border border-[rgba(0,168,107,0.2)]">
    <i className="fas fa-check-circle text-[#00a86b] text-xs"></i>
    <span>{children}</span>
  </div>
);

const FeatureItem = ({ children }) => (
  <div className="flex items-center gap-2 text-white text-sm sm:text-base bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20">
    <i className="fas fa-check-circle text-[#e8f5e9] text-base"></i>
    <span>{children}</span>
  </div>
);

export default HeroSection;
