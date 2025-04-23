import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable LinkButton component with different variants and sizes
 * Similar to Button but uses React Router's Link component
 * 
 * @param {Object} props - Component props
 * @param {string} props.to - The URL to link to
 * @param {string} [props.variant='primary'] - Button variant (primary, secondary, text)
 * @param {string} [props.size='md'] - Button size (sm, md, lg)
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.fullWidth] - Whether the button should take full width
 * @param {React.ReactNode} props.children - Button content
 * @param {Object} props.rest - Additional props to pass to the Link element
 */
const LinkButton = ({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  children,
  ...rest
}) => {
  // Base styles applied to all variants
  const baseStyles = 'font-medium transition-colors rounded-full focus:outline-none inline-block text-center';
  
  // Variant-specific styles
  const variantStyles = {
    primary: 'bg-[#147A31] text-white hover:bg-[#0e6631] border-2 border-[#147A31]',
    secondary: 'border-2 border-[#147A31] text-[#147A31] bg-white hover:bg-[#147A31] hover:text-white',
    text: 'text-[#147A31] hover:text-[#0e6631] border-2 border-transparent'
  };
  
  // Size-specific styles
  const sizeStyles = {
    sm: 'text-xs py-2 px-3',
    md: 'text-sm py-2 px-6',
    lg: 'text-base py-3 px-8'
  };

  // Full width style
  const widthStyle = fullWidth ? 'w-full' : 'w-fit';

  // Combine all styles
  const linkStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

  return (
    <Link 
      to={to}
      className={linkStyles}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default LinkButton; 