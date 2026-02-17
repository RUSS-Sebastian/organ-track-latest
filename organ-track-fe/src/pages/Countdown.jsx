import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const ReportPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeCalendar, setActiveCalendar] = useState(null); // 'start' or 'end'
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7, 1)); // August 2025
  const [error, setError] = useState('');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleDateSelect = (day) => {
    if (!day) return;
    
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formattedDate = `${selectedDate.getMonth() + 1}/${day}/${selectedDate.getFullYear()}`;
    
    if (activeCalendar === 'start') {
      setStartDate(formattedDate);
      if (endDate) {
        setError('');
      }
    } else if (activeCalendar === 'end') {
      setEndDate(formattedDate);
      if (startDate) {
        setError('');
      }
    }
    setActiveCalendar(null);
  };

  const handleGenerate = () => {
    if (!startDate && !endDate) {
      setError('Please select both start date and end date');
    } else if (!startDate) {
      setError('Please select start date');
    } else if (!endDate) {
      setError('Please select end date');
    } else {
      setError('');
      // Proceed with generation
      console.log('Generating report from', startDate, 'to', endDate);
    }
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const CalendarComponent = ({ type }) => {
    if (activeCalendar !== type) return null;

    const days = getDaysInMonth(currentMonth);

    return (
      <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-10 w-[320px]">
        {/* Month and Year Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigateMonth('prev')} className="p-1">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button onClick={() => navigateMonth('next')} className="p-1">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateSelect(day)}
              disabled={!day}
              className={`p-2 text-sm rounded hover:bg-blue-100 ${
                !day ? 'invisible' : ''
              } ${
                (type === 'start' && startDate?.includes(`/${day}/`) ||
                 type === 'end' && endDate?.includes(`/${day}/`))
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : ''
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Cancel/OK Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button 
            onClick={() => setActiveCalendar(null)}
            className="px-4 py-1 text-sm border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            onClick={() => setActiveCalendar(null)}
            className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[982px] w-full flex justify-center bg-white border border-red-500">
      {/* Mobile container */}
      <div className="w-full max-w-[402px] px-4 pt-6 pb-10 border border-blue-500">
        <h1 className="text-2xl font-semibold mb-6">Generate Health Report here</h1>
        <p className="text-gray-600 mb-8">Track your health over time</p>

        {/* Start Date */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <div className="relative">
            <div 
              onClick={() => setActiveCalendar('start')}
              className="flex items-center justify-between border rounded-lg p-3 cursor-pointer hover:border-blue-500"
            >
              <span className={startDate ? 'text-gray-900' : 'text-gray-400'}>
                {startDate || 'MM/DD/YYYY'}
              </span>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <CalendarComponent type="start" />
          </div>
        </div>

        {/* End Date */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <div className="relative">
            <div 
              onClick={() => setActiveCalendar('end')}
              className="flex items-center justify-between border rounded-lg p-3 cursor-pointer hover:border-blue-500"
            >
              <span className={endDate ? 'text-gray-900' : 'text-gray-400'}>
                {endDate || 'MM/DD/YYYY'}
              </span>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <CalendarComponent type="end" />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!startDate || !endDate}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            !startDate || !endDate
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default ReportPage;