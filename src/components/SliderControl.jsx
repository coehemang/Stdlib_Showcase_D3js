import React from 'react';

const SliderControl = ({ 
  label, 
  value = 0, 
  onChange, 
  min = 0, 
  max = 10, 
  step = 1, 
  color = 'indigo',
  displayValue
}) => {
  const colorClasses = {
    pink: 'text-pink-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    indigo: 'text-indigo-600'
  };

  const thumbColorClasses = {
    pink: 'bg-pink-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500'
  };

  const trackColorClasses = {
    pink: 'bg-pink-200',
    blue: 'bg-blue-200',
    green: 'bg-green-200',
    purple: 'bg-purple-200',
    indigo: 'bg-indigo-200'
  };

  const textColorClass = colorClasses[color] || 'text-indigo-600';
  const thumbColorClass = thumbColorClasses[color] || 'bg-indigo-500';
  const trackColorClass = trackColorClasses[color] || 'bg-indigo-200';

  const handleChange = (e) => {
    onChange(parseFloat(e.target.value));
  };

  const numericValue = typeof value === 'number' && !isNaN(value) ? value : 0;

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex justify-between mb-2">
        <label className="font-medium">{label}</label>
        <span className={`font-mono ${textColorClass}`}>
          {displayValue !== undefined ? displayValue : numericValue.toFixed(1)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={numericValue}
        onChange={handleChange}
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${trackColorClass}`}
        style={{
          WebkitAppearance: 'none',
          '--thumb-color': `var(--${color}-500, #6366f1)`,
        }}
      />
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default SliderControl;
