import React, { useState, useEffect } from 'react';

const DailyHabitCheckin = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [canAnswer, setCanAnswer] = useState(false);
  const [startTime] = useState(new Date());
  const [testMode, setTestMode] = useState(false);
  const [testTime, setTestTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 10 // Default test time: 10 seconds
  });
  const [showTestControls, setShowTestControls] = useState(false);

  // Navigation function
  const goToTrackPage = () => {
    window.location.href = '/track'; // or use router.push if using Next.js
    // If using React Router, you can use: navigate('/track');
  };

  // Calculate time left until midnight (12:00 AM)
  const calculateTimeLeft = () => {
    if (testMode) {
      // In test mode, use the test time values
      return {
        hours: testTime.hours,
        minutes: testTime.minutes,
        seconds: testTime.seconds
      };
    }

    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to next day 12:00 AM
    
    const difference = midnight - now;
    
    if (difference <= 0) {
      // It's past midnight, user can answer
      setCanAnswer(true);
      return {
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return {
      hours,
      minutes,
      seconds
    };
  };

  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Check if we've reached zero in test mode or midnight in real mode
      if (testMode) {
        if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
          setCanAnswer(true);
        } else {
          // In test mode, count down the test time
          setTestTime(prev => {
            if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
              return prev;
            }
            
            let newHours = prev.hours;
            let newMinutes = prev.minutes;
            let newSeconds = prev.seconds - 1;
            
            if (newSeconds < 0) {
              newSeconds = 59;
              newMinutes -= 1;
              
              if (newMinutes < 0) {
                newMinutes = 59;
                newHours -= 1;
              }
            }
            
            return {
              hours: Math.max(0, newHours),
              minutes: Math.max(0, newMinutes),
              seconds: Math.max(0, newSeconds)
            };
          });
        }
      } else {
        // Real mode: check for midnight
        if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
          setCanAnswer(true);
          clearInterval(timer);
        }
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [testMode, testTime.hours, testTime.minutes, testTime.seconds]);

  // Toggle test mode
  const toggleTestMode = () => {
    setTestMode(!testMode);
    setCanAnswer(false);
    if (!testMode) {
      // Entering test mode
      setShowTestControls(true);
      setTestTime({ hours: 0, minutes: 0, seconds: 10 });
    } else {
      // Exiting test mode
      setShowTestControls(false);
      // Reset to real time
      setTimeLeft(calculateTimeLeft());
    }
  };

  // Quick test presets
  const setTestPreset = (preset) => {
    switch(preset) {
      case 'almost':
        setTestTime({ hours: 0, minutes: 0, seconds: 3 });
        setCanAnswer(false);
        break;
      case 'ready':
        setTestTime({ hours: 0, minutes: 0, seconds: 0 });
        setCanAnswer(true);
        break;
      case 'medium':
        setTestTime({ hours: 0, minutes: 5, seconds: 0 });
        setCanAnswer(false);
        break;
      default:
        break;
    }
  };

  // Manual time adjustment
  const adjustTestTime = (type, value) => {
    setTestTime(prev => {
      const newTime = { ...prev };
      newTime[type] = Math.max(0, Math.min(type === 'hours' ? 23 : 59, prev[type] + value));
      return newTime;
    });
    setCanAnswer(false);
  };

  // Format numbers to always show 2 digits
  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      
      {/* Test Mode Toggle Button */}
      <button
        onClick={toggleTestMode}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-green-200 flex items-center gap-2 hover:bg-white transition-all duration-300 group"
      >
        <span className={`text-sm font-medium ${testMode ? 'text-green-600' : 'text-gray-500'}`}>
          {testMode ? 'Test Mode ON' : 'Test Mode'}
        </span>
      </button>

      {/* Test Controls Panel */}
      {showTestControls && (
        <div className="absolute top-20 right-4 z-50 w-72 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-200 p-4 animate-slideDown">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-green-800 flex items-center gap-2">
              Test Controls
            </h3>
            <button 
              onClick={() => setShowTestControls(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setTestPreset('almost')}
              className="px-2 py-1.5 bg-amber-50 text-amber-700 text-xs rounded-lg border border-amber-200 hover:bg-amber-100"
            >
              Almost Ready
            </button>
            <button
              onClick={() => setTestPreset('ready')}
              className="px-2 py-1.5 bg-green-50 text-green-700 text-xs rounded-lg border border-green-200 hover:bg-green-100"
            >
              Ready Now
            </button>
            <button
              onClick={() => setTestPreset('medium')}
              className="px-2 py-1.5 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-200 hover:bg-blue-100"
            >
              5 Minutes
            </button>
          </div>

          {/* Manual Time Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Hours</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustTestTime('hours', -1)}
                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono">{testTime.hours}</span>
                <button
                  onClick={() => adjustTestTime('hours', 1)}
                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Minutes</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustTestTime('minutes', -1)}
                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono">{testTime.minutes}</span>
                <button
                  onClick={() => adjustTestTime('minutes', 1)}
                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Seconds</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustTestTime('seconds', -1)}
                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono">{testTime.seconds}</span>
                <button
                  onClick={() => adjustTestTime('seconds', 1)}
                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Test Mode Indicator */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded-lg">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span>Testing with custom time values</span>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
               backgroundRepeat: 'repeat'
             }}>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[420px] relative z-10">
        {/* Glass Card with Green Theme */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden">
          {/* Top Decorative Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-100/30 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-10 mt-4">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Daily Habit Check-In
              </h1>
              <p className="text-gray-500 flex items-center justify-center gap-2">
                <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                <span className="w-1 h-1 bg-green-400 rounded-full"></span>
              </p>
            </div>

            {/* Countdown Timer Display */}
            <div className="mb-8">
              <div className="flex justify-center items-center gap-4 mb-6">
                {/* Hours */}
                <div className="text-center">
                  <div className="text-7xl font-bold bg-gradient-to-b from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mt-2">Hours</div>
                </div>
                
                <span className="text-5xl font-light text-green-300/50">:</span>
                
                {/* Minutes */}
                <div className="text-center">
                  <div className="text-7xl font-bold bg-gradient-to-b from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mt-2">Minutes</div>
                </div>
                
                <span className="text-5xl font-light text-green-300/50">:</span>
                
                {/* Seconds */}
                <div className="text-center">
                  <div className="text-7xl font-bold bg-gradient-to-b from-teal-600 to-green-600 bg-clip-text text-transparent">
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mt-2">Seconds</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full transition-all duration-1000"
                  style={{ 
                    width: testMode 
                      ? `${((testTime.hours * 3600 + testTime.minutes * 60 + testTime.seconds) / (24 * 3600)) * 100}%`
                      : `${((24 - timeLeft.hours) / 24) * 100}%`,
                    opacity: timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? 1 : 0.8
                  }}
                ></div>
              </div>
            </div>

            {/* Message Section - Now Clickable when ready */}
            <div className="text-center">
              {!canAnswer ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">
                    {testMode ? '⏱️ Test countdown in progress' : 'Time remaining until next check-in'}
                  </p>
                  <div className="bg-green-50/50 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm text-green-700">
                      ⏳ Please wait {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s to enter the next Check-in
                      {testMode && <span className="block text-xs text-purple-600 mt-1">(Test mode: using demo timer)</span>}
                    </p>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={goToTrackPage}
                  className="space-y-3 cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
  
                  <div className="bg-green-50/50 backdrop-blur-sm rounded-xl p-4 hover:bg-green-100/50 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-green-300">
                    <p className="text-sm text-green-700 font-medium">
                      ✓ Click here to answer to answer the questions
                    </p>
                    {testMode && <span className="block text-xs text-purple-600 mt-1"></span>}
                  </div>
                </div>
              )}
            </div>

            {/* Make the entire card clickable when ready (optional) */}
            {canAnswer && (
              <div 
                onClick={goToTrackPage}
                className="absolute inset-0 cursor-pointer z-20"
                style={{ background: 'transparent' }}
                title="Click anywhere to go to track page"
              ></div>
            )}

            {/* Decorative Footer */}
            <div className="mt-12 flex justify-center gap-2">
              <div className="w-1 h-1 bg-green-200 rounded-full"></div>
              <div className="w-1 h-1 bg-green-300 rounded-full"></div>
              <div className="w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-600 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="w-1 h-1 bg-green-300 rounded-full"></div>
              <div className="w-1 h-1 bg-green-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-out;
          }
          .animation-delay-2000 {
            animation-delay: 2000ms;
          }
          .animation-delay-4000 {
            animation-delay: 4000ms;
          }
        `}
      </style>
    </div>
  );
};

export default DailyHabitCheckin;