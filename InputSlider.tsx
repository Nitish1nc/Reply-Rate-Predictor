import React from 'react';

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const InputSlider: React.FC<InputSliderProps> = ({ label, value, onChange, min = 0, max = 100, step = 1 }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let numValue = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    if (isNaN(numValue)) numValue = 0;
    if (numValue > max) numValue = max;
    if (numValue < min) numValue = min;
    onChange(numValue);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-indigo-600"
        />
        <div className="relative">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleInputChange}
            className="w-20 bg-white text-gray-900 text-center rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">%</span>
        </div>
      </div>
    </div>
  );
};

export default InputSlider;