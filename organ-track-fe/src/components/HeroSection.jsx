import React from "react";
import doctorImage from "../assets/doctor-image.png";

const HeroSection = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="flex items-center gap-10 lg:gap-[60px] flex-wrap">
        {/* Visual Section (Left) */}
        <div className="flex-1 min-w-[300px]">
          <div className="bg-white/10 backdrop-blur-[20px] rounded-[30px] p-8 md:p-10 border-2 border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
            {/* Organ Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
              {/* Heart */}
              <div className="group flex flex-col items-center justify-center p-4 md:p-5 bg-white/15 backdrop-blur-[10px] rounded-[20px] border-2 border-white/40 transition-all duration-400 cursor-pointer relative overflow-hidden hover:bg-white/25 hover:-translate-y-2 hover:scale-[1.08] hover:border-white hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-white/5 before:z-[1] before:transition-all before:duration-400 hover:before:bg-gradient-to-br hover:before:from-white/20 hover:before:to-white/10">
                <div className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] flex items-center justify-center text-2xl md:text-4xl text-[rgba(255,107,107,0.9)] mb-2 relative z-[2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <span className="text-xs md:text-sm text-white font-semibold text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] relative z-[2]">
                  Heart
                </span>
              </div>

              {/* Lungs */}
              <div className="group flex flex-col items-center justify-center p-4 md:p-5 bg-white/15 backdrop-blur-[10px] rounded-[20px] border-2 border-white/40 transition-all duration-400 cursor-pointer relative overflow-hidden hover:bg-white/25 hover:-translate-y-2 hover:scale-[1.08] hover:border-white hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-white/5 before:z-[1] before:transition-all before:duration-400 hover:before:bg-gradient-to-br hover:before:from-white/20 hover:before:to-white/10">
                <div className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] flex items-center justify-center text-2xl md:text-4xl text-[rgba(78,205,196,0.9)] mb-2 relative z-[2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <i className="fas fa-lungs"></i>
                </div>
                <span className="text-xs md:text-sm text-white font-semibold text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] relative z-[2]">
                  Lungs
                </span>
              </div>

              {/* Liver */}
              <div className="group flex flex-col items-center justify-center p-4 md:p-5 bg-white/15 backdrop-blur-[10px] rounded-[20px] border-2 border-white/40 transition-all duration-400 cursor-pointer relative overflow-hidden hover:bg-white/25 hover:-translate-y-2 hover:scale-[1.08] hover:border-white hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-white/5 before:z-[1] before:transition-all before:duration-400 hover:before:bg-gradient-to-br hover:before:from-white/20 hover:before:to-white/10">
                <div className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] flex items-center justify-center text-2xl md:text-4xl text-[rgba(255,230,109,0.9)] mb-2 relative z-[2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <i className="fas fa-prescription-bottle"></i>
                </div>
                <span className="text-xs md:text-sm text-white font-semibold text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] relative z-[2]">
                  Liver
                </span>
              </div>

              {/* Kidney */}
              <div className="group flex flex-col items-center justify-center p-4 md:p-5 bg-white/15 backdrop-blur-[10px] rounded-[20px] border-2 border-white/40 transition-all duration-400 cursor-pointer relative overflow-hidden hover:bg-white/25 hover:-translate-y-2 hover:scale-[1.08] hover:border-white hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-white/5 before:z-[1] before:transition-all before:duration-400 hover:before:bg-gradient-to-br hover:before:from-white/20 hover:before:to-white/10">
                <div className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] flex items-center justify-center text-2xl md:text-4xl text-[rgba(26,83,92,0.9)] mb-2 relative z-[2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <i className="fas fa-filter"></i>
                </div>
                <span className="text-xs md:text-sm text-white font-semibold text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] relative z-[2]">
                  Kidney
                </span>
              </div>

              {/* Brain */}
              <div className="group flex flex-col items-center justify-center p-4 md:p-5 bg-white/15 backdrop-blur-[10px] rounded-[20px] border-2 border-white/40 transition-all duration-400 cursor-pointer relative overflow-hidden hover:bg-white/25 hover:-translate-y-2 hover:scale-[1.08] hover:border-white hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-white/5 before:z-[1] before:transition-all before:duration-400 hover:before:bg-gradient-to-br hover:before:from-white/20 hover:before:to-white/10">
                <div className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] flex items-center justify-center text-2xl md:text-4xl text-[rgba(108,92,231,0.9)] mb-2 relative z-[2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <i className="fas fa-brain"></i>
                </div>
                <span className="text-xs md:text-sm text-white font-semibold text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] relative z-[2]">
                  Brain
                </span>
              </div>

              {/* Stomach */}
              <div className="group flex flex-col items-center justify-center p-4 md:p-5 bg-white/15 backdrop-blur-[10px] rounded-[20px] border-2 border-white/40 transition-all duration-400 cursor-pointer relative overflow-hidden hover:bg-white/25 hover:-translate-y-2 hover:scale-[1.08] hover:border-white hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-white/5 before:z-[1] before:transition-all before:duration-400 hover:before:bg-gradient-to-br hover:before:from-white/20 hover:before:to-white/10">
                <div className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] flex items-center justify-center text-2xl md:text-4xl text-[rgba(253,121,168,0.9)] mb-2 relative z-[2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <i className="fas fa-tint"></i>
                </div>
                <span className="text-xs md:text-sm text-white font-semibold text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] relative z-[2]">
                  Stomach
                </span>
              </div>

              {/* Eyes */}
              <div className="group flex flex-col items-center justify-center p-4 md:p-5 bg-white/15 backdrop-blur-[10px] rounded-[20px] border-2 border-white/40 transition-all duration-400 cursor-pointer relative overflow-hidden hover:bg-white/25 hover:-translate-y-2 hover:scale-[1.08] hover:border-white hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-white/5 before:z-[1] before:transition-all before:duration-400 hover:before:bg-gradient-to-br hover:before:from-white/20 hover:before:to-white/10">
                <div className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] flex items-center justify-center text-2xl md:text-4xl text-[rgba(0,206,201,0.9)] mb-2 relative z-[2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <i className="fas fa-eye"></i>
                </div>
                <span className="text-xs md:text-sm text-white font-semibold text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] relative z-[2]">
                  Eyes
                </span>
              </div>

              {/* Skin */}
              <div className="group flex flex-col items-center justify-center p-4 md:p-5 bg-white/15 backdrop-blur-[10px] rounded-[20px] border-2 border-white/40 transition-all duration-400 cursor-pointer relative overflow-hidden hover:bg-white/25 hover:-translate-y-2 hover:scale-[1.08] hover:border-white hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-white/5 before:z-[1] before:transition-all before:duration-400 hover:before:bg-gradient-to-br hover:before:from-white/20 hover:before:to-white/10">
                <div className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] flex items-center justify-center text-2xl md:text-4xl text-[rgba(250,177,160,0.9)] mb-2 relative z-[2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <i className="fas fa-hand-sparkles"></i>
                </div>
                <span className="text-xs md:text-sm text-white font-semibold text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] relative z-[2]">
                  Skin
                </span>
              </div>
            </div>

            {/* Doctor Section */}
            <div className="bg-white/90 backdrop-blur-[15px] rounded-[25px] p-6 md:p-8 border-2 border-white/60 flex flex-col lg:flex-row items-center gap-6 md:gap-8 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(0,168,107,0.05)] before:to-[rgba(13,152,186,0.05)] before:z-[1]">
              <div className="flex-shrink-0 relative z-[2]">
                <img
                  src={doctorImage}
                  alt="Medical Professional"
                  className="w-[150px] md:w-[200px] h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div className="flex-1 text-center lg:text-left relative z-[2]">
                <h3 className="text-[#1a535c] text-xl md:text-2xl lg:text-3xl mb-3 flex items-center justify-center lg:justify-start gap-3">
                  <i className="fas fa-shield-alt text-[#00a86b] text-2xl md:text-3xl"></i>
                  Medical Advisory Supported
                </h3>
                <p className="text-[#4a6b73] text-sm md:text-base leading-relaxed mb-5">
                  Our organ tracking algorithms are reviewed by healthcare
                  professionals to ensure accurate, reliable health monitoring.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 text-[#1a535c] text-xs md:text-sm font-medium px-4 py-2 bg-[rgba(0,168,107,0.1)] rounded-[20px] border border-[rgba(0,168,107,0.2)]">
                    <i className="fas fa-check-circle text-[#00a86b]"></i>
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1a535c] text-xs md:text-sm font-medium px-4 py-2 bg-[rgba(0,168,107,0.1)] rounded-[20px] border border-[rgba(0,168,107,0.2)]">
                    <i className="fas fa-check-circle text-[#00a86b]"></i>
                    <span>Doctor Reviewed</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1a535c] text-xs md:text-sm font-medium px-4 py-2 bg-[rgba(0,168,107,0.1)] rounded-[20px] border border-[rgba(0,168,107,0.2)]">
                    <i className="fas fa-check-circle text-[#00a86b]"></i>
                    <span>Evidence-Based</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Section (Right) */}
        <div className="flex-1 min-w-[300px] text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            Professional Organ Health Tracking
          </h1>
          <p className="text-lg md:text-xl text-white/95 mb-8 md:mb-10 leading-relaxed font-light">
            Monitor your vital organs with medical-grade precision. Get insights
            that help you make informed health decisions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 md:mb-10">
            <div className="flex items-center gap-3 text-white text-sm md:text-base bg-white/10 backdrop-blur-[10px] px-5 py-3 rounded-[10px] border border-white/20">
              <i className="fas fa-check-circle text-[#e8f5e9] text-base md:text-lg"></i>
              <span>Medical advisory supported</span>
            </div>
            <div className="flex items-center gap-3 text-white text-sm md:text-base bg-white/10 backdrop-blur-[10px] px-5 py-3 rounded-[10px] border border-white/20">
              <i className="fas fa-check-circle text-[#e8f5e9] text-base md:text-lg"></i>
              <span>Clinical accuracy standards</span>
            </div>
            <div className="flex items-center gap-3 text-white text-sm md:text-base bg-white/10 backdrop-blur-[10px] px-5 py-3 rounded-[10px] border border-white/20">
              <i className="fas fa-check-circle text-[#e8f5e9] text-base md:text-lg"></i>
              <span>Professional health reports</span>
            </div>
            <div className="flex items-center gap-3 text-white text-sm md:text-base bg-white/10 backdrop-blur-[10px] px-5 py-3 rounded-[10px] border border-white/20">
              <i className="fas fa-check-circle text-[#e8f5e9] text-base md:text-lg"></i>
              <span>Secure & confidential</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start">
            <button
              className="bg-white text-[#00a86b] font-semibold text-base md:text-lg px-6 md:px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] border-none cursor-pointer"
              onClick={() => (window.location.href = "/login")}
            >
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
