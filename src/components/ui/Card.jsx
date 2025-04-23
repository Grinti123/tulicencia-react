import React from 'react';

/**
 * Reusable Card component with different variants
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Card variant (default, primary, secondary)
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.shadow] - Whether to show a shadow
 * @param {boolean} [props.fullWidth] - Whether the card should take full width
 * @param {React.ReactNode} props.children - Card content
 * @param {Object} props.rest - Additional props to pass to the div element
 */
const Card = ({
  variant = 'default',
  className = '',
  shadow = false,
  fullWidth = false,
  children,
  ...rest
}) => {
  // Base styles applied to all cards
  const baseStyles = 'rounded-2xl p-4 md:p-6 transition-all';
  
  // Variant-specific styles
  const variantStyles = {
    default: 'bg-white',
    primary: 'bg-[#f1f1ff]',
    secondary: 'bg-[#f8f8ff]'
  };
  
  // Shadow style
  const shadowStyle = shadow ? 'shadow-md' : '';

  // Full width style
  const widthStyle = fullWidth ? 'w-full' : '';

  // Combine all styles
  const cardStyles = `${baseStyles} ${variantStyles[variant]} ${shadowStyle} ${widthStyle} ${className}`;

  return (
    <div 
      className={cardStyles}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card; 