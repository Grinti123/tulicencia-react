import React from 'react';

/**
 * Reusable RadioGroup component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of option objects with value and label
 * @param {string} props.name - Name for the radio input group
 * @param {string} [props.value] - Currently selected value
 * @param {Function} props.onChange - Change handler function
 * @param {string} [props.className] - Additional CSS classes for the container
 * @param {string} [props.optionClassName] - Additional CSS classes for each option
 */
const RadioGroup = ({
  options,
  name,
  value,
  onChange,
  className = '',
  optionClassName = ''
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={`space-y-4 md:space-y-6 ${className}`}>
      {options.map((option) => (
        <label 
          key={option.value} 
          className={`flex items-center space-x-3 cursor-pointer ${optionClassName}`}
        >
          <input
            type="radio"
            name={name}
            className="form-radio h-4 w-4 md:h-5 md:w-5 text-indigo-600"
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
          />
          <span className="text-gray-700 text-sm md:text-base">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup; 