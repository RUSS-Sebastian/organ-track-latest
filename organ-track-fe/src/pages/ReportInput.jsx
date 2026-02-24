import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportInput = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [startMonth, setStartMonth] = useState(new Date());
  const [endMonth, setEndMonth] = useState(new Date());
  const [error, setError] = useState('');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Helper function to check if a year is a leap year
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // Helper function to get days in month with proper leap year handling
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Array of days in each month (index 0 = January)
    const daysInMonthArray = [
      31, // January
      isLeapYear(year) ? 29 : 28, // February (leap year check)
      31, // March
      30, // April
      31, // May
      30, // June
      31, // July
      31, // August
      30, // September
      31, // October
      30, // November
      31  // December
    ];
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = daysInMonthArray[month];
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  // Helper function to parse date string to Date object
  const parseDateString = (dateString) => {
    if (!dateString) return null;
    const [month, day, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Validate date ranges
  const validateDates = (newStartDate, newEndDate) => {
    const start = parseDateString(newStartDate);
    const end = parseDateString(newEndDate);
    
    if (start && end && start > end) {
      setError('End date cannot be earlier than start date');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleStartDateSelect = (day) => {
    if (!day) return;
    const selectedDate = new Date(startMonth.getFullYear(), startMonth.getMonth(), day);
    const formattedDate = `${selectedDate.getMonth() + 1}/${day}/${selectedDate.getFullYear()}`;
    
    setStartDate(formattedDate);
    setShowStartCalendar(false);
    
    // Validate with existing end date
    if (endDate) {
      validateDates(formattedDate, endDate);
    } else {
      setError('');
    }
  };

  const handleEndDateSelect = (day) => {
    if (!day) return;
    const selectedDate = new Date(endMonth.getFullYear(), endMonth.getMonth(), day);
    const formattedDate = `${selectedDate.getMonth() + 1}/${day}/${selectedDate.getFullYear()}`;
    
    setEndDate(formattedDate);
    setShowEndCalendar(false);
    
    // Validate with existing start date
    if (startDate) {
      validateDates(startDate, formattedDate);
    } else {
      setError('');
    }
  };

  const handleYearSelect = (type, year) => {
    if (type === 'start') {
      const newMonth = new Date(startMonth);
      newMonth.setFullYear(parseInt(year));
      setStartMonth(newMonth);
    } else {
      const newMonth = new Date(endMonth);
      newMonth.setFullYear(parseInt(year));
      setEndMonth(newMonth);
    }
  };

  const handleGenerate = () => {
    if (!startDate && !endDate) {
      setError('Please select both start date and end date');
    } else if (!startDate) {
      setError('Please select start date');
    } else if (!endDate) {
      setError('Please select end date');
    } else {
      // Final validation before generating
      if (validateDates(startDate, endDate)) {
        setError('');
        console.log('Generating report from', startDate, 'to', endDate);
        // Navigate to check-in page with state
        navigate('/checkin', { 
          state: { 
            startDate: startDate, 
            endDate: endDate 
          } 
        });
      }
    }
  };

  const isGenerateDisabled = !startDate || !endDate;

  const CalendarComponent = ({ type, month, onDateSelect, onNavigate, show, onClose }) => {
    if (!show) return null;
    const days = getDaysInMonth(month);

    // Available years for selection (from 1900 to 2031)
    const years = [];
    for (let i = 2031; i >= 1900; i--) {
      years.push(i);
    }

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-green-200 rounded-xl shadow-2xl p-3 z-50 w-full"
           style={{ animation: 'fadeIn 0.2s ease-out' }}>
        {/* Calendar Header with Year Dropdown */}
        <div className="flex flex-col gap-2 mb-2">
          {/* Month Navigation */}
          <div className="flex justify-between items-center">
            <div className="text-sm font-semibold">
              <span className="text-green-700">{months[month.getMonth()]}</span>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => onNavigate('prev')} 
                className="w-6 h-6 flex items-center justify-center border border-green-200 rounded-md hover:bg-green-50 transition-all"
                title="Previous month"
              >
                <span className="text-green-500 text-sm">←</span>
              </button>
              <button 
                onClick={() => onNavigate('next')} 
                className="w-6 h-6 flex items-center justify-center border border-green-200 rounded-md hover:bg-green-50 transition-all"
                title="Next month"
              >
                <span className="text-green-500 text-sm">→</span>
              </button>
            </div>
          </div>
          
          {/* Year Dropdown Selection */}
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-600 font-medium">Year:</div>
            <select
              value={month.getFullYear()}
              onChange={(e) => handleYearSelect(type, e.target.value)}
              className="text-sm font-semibold text-green-600 bg-green-50 border border-green-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
            >
              {years.map(year => (
                <option key={year} value={year} className="text-gray-700">
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Weekdays - Compact */}
        <div className="grid grid-cols-7 gap-0 mb-1">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-xs font-bold text-green-600 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days - Compact */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {days.map((day, index) => {
            const dateStr = day ? `${month.getMonth() + 1}/${day}/${month.getFullYear()}` : '';
            const isSelected = (type === 'start' && startDate === dateStr) || 
                              (type === 'end' && endDate === dateStr);
            
            return (
              <button
                key={index}
                onClick={() => day && onDateSelect(day)}
                disabled={!day}
                className={`
                  aspect-square flex items-center justify-center text-xs rounded-md transition-all duration-200
                  ${!day ? 'invisible' : 'hover:bg-green-100 hover:scale-110 hover:shadow-md'}
                  ${day && isSelected 
                    ? 'bg-green-500 text-white shadow-md' 
                    : day ? 'text-gray-700 hover:text-green-700' : 'text-gray-400'}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Leap Year Indicator (for February) */}
        {month.getMonth() === 1 && (
          <div className="text-center mb-2">
            <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {isLeapYear(month.getFullYear()) ? 'Leap Year - 29 days' : '28 days'}
            </span>
          </div>
        )}

        {/* Actions - Compact */}
        <div className="flex justify-end gap-1 pt-2 border-t border-green-100">
          <button 
            onClick={onClose}
            className="px-3 py-1 text-xs border border-green-200 rounded-md text-green-600 hover:bg-green-50"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
             style={{ animation: 'blob 7s infinite' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
             style={{ animation: 'blob 7s infinite 2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
             style={{ animation: 'blob 7s infinite 4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
               backgroundRepeat: 'repeat'
             }}>
        </div>
      </div>

      {/* Main Card with Glass Effect */}
      <div className="w-full max-w-[380px] relative z-10 group">
        {/* Decorative Elements */}
        <div className="absolute -inset-1 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        
        {/* Card Content */}
        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/50">
          
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
              Health Report
            </h1>
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                 Select your date range
              <span className="w-1 h-1 bg-green-400 rounded-full"></span>
            </p>
          </div>

          {/* Start Date Section */}
          <div className="mb-6 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-gradient-to-b from-green-400 to-green-500 rounded-full"></div>
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</h2>
            </div>
            <div 
              onClick={() => {
                setShowStartCalendar(!showStartCalendar);
                setShowEndCalendar(false);
              }}
              className="relative overflow-hidden bg-white/50 backdrop-blur-sm border-2 border-green-200/50 rounded-xl p-3 cursor-pointer hover:border-green-400 hover:bg-white/80 transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">Select Date</span>
                <span className={`text-sm font-semibold ${startDate ? 'text-gray-800' : 'text-gray-400'}`}>
                  {startDate || 'MM/DD/YYYY'}
                </span>
              </div>
            </div>
            
            <CalendarComponent
              type="start"
              month={startMonth}
              onDateSelect={handleStartDateSelect}
              onNavigate={(direction) => {
                const newMonth = new Date(startMonth);
                newMonth.setMonth(newMonth.getMonth() + (direction === 'prev' ? -1 : 1));
                setStartMonth(newMonth);
              }}
              show={showStartCalendar}
              onClose={() => setShowStartCalendar(false)}
            />
          </div>

          {/* End Date Section */}
          <div className="mb-6 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-full"></div>
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</h2>
            </div>
            <div 
              onClick={() => {
                setShowEndCalendar(!showEndCalendar);
                setShowStartCalendar(false);
              }}
              className="relative overflow-hidden bg-white/50 backdrop-blur-sm border-2 border-emerald-200/50 rounded-xl p-3 cursor-pointer hover:border-emerald-400 hover:bg-white/80 transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">Select Date</span>
                <span className={`text-sm font-semibold ${endDate ? 'text-gray-800' : 'text-gray-400'}`}>
                  {endDate || 'MM/DD/YYYY'}
                </span>
              </div>
            </div>
            
            <CalendarComponent
              type="end"
              month={endMonth}
              onDateSelect={handleEndDateSelect}
              onNavigate={(direction) => {
                const newMonth = new Date(endMonth);
                newMonth.setMonth(newMonth.getMonth() + (direction === 'prev' ? -1 : 1));
                setEndMonth(newMonth);
              }}
              show={showEndCalendar}
              onClose={() => setShowEndCalendar(false)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-lg"
                 style={{ animation: 'shake 0.5s ease-in-out' }}>
              <p className="text-xs text-red-500 text-center font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerateDisabled}
            className={`
              relative w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 overflow-hidden group
              ${isGenerateDisabled 
                ? 'bg-gray-200/50 text-gray-400 cursor-not-allowed backdrop-blur-sm' 
                : 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }
            `}
          >
            {!isGenerateDisabled && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            )}
            <span className="relative z-10">Generate Health Report</span>
          </button>

          {/* Success Message */}
          {!isGenerateDisabled && !error && (
            <div className="mt-3 flex justify-center items-center gap-2"
                 style={{ animation: 'fadeInUp 0.5s ease-out' }}>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-1 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <p className="text-xs text-green-600 font-medium">
                Ready to generate
              </p>
            </div>
          )}

          {/* Decorative Footer Dots */}
          <div className="mt-4 flex justify-center gap-1">
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

      {/* Keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ReportInput;