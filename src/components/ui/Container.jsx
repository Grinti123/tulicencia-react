import React from 'react';

/**
 * Reusable Container component for consistent layout
 * 
 * @param {Object} props - Component props
 * @param {string} [props.size='default'] - Container size (sm, default, lg, xl)
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.centered] - Whether to center the content horizontally
 * @param {React.ReactNode} props.children - Container content
 * @param {Object} props.rest - Additional props to pass to the div element
 */
const Container = ({
  size = 'default',
  className = '',
  centered = true,
  children,
  ...rest
}) => {
  // Base styles applied to all containers
  const baseStyles = 'px-4 md:px-6 w-full';
  
  // Size-specific styles
  const sizeStyles = {
    sm: 'max-w-3xl',
    default: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl'
  };
  
  // Centered style
  const centeredStyle = centered ? 'mx-auto' : '';

  // Combine all styles
  const containerStyles = `${baseStyles} ${sizeStyles[size]} ${centeredStyle} ${className}`;

  return (
    <div 
      className={containerStyles}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Container; 