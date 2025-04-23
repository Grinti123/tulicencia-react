import React from 'react';

/**
 * Reusable Section component for page sections
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.withContainer] - Whether to include a container inside the section
 * @param {string} [props.bg='white'] - Background color (white, light, primary)
 * @param {string} [props.containerSize='default'] - Size of the inner container if withContainer is true
 *                                                 (sm, default, lg, xl, full)
 * @param {React.ReactNode} props.children - Section content
 * @param {Object} props.rest - Additional props to pass to the section element
 */
const Section = ({
  className = '',
  withContainer = true,
  bg = 'white',
  containerSize = 'default',
  children,
  ...rest
}) => {
  // Base styles applied to all sections
  const baseStyles = 'py-12 md:py-16';
  
  // Background styles
  const bgStyles = {
    white: 'bg-white',
    light: 'bg-[#f8f8ff]',
    primary: 'bg-[#147A31] text-white'
  };

  // Combine section styles
  const sectionStyles = `${baseStyles} ${bgStyles[bg]} ${className}`;

  // Container styles
  const containerStyles = {
    sm: 'px-4 md:px-6 max-w-3xl mx-auto w-full',
    default: 'px-4 md:px-6 max-w-5xl mx-auto w-full',
    lg: 'px-4 md:px-6 max-w-6xl mx-auto w-full',
    xl: 'px-4 md:px-6 max-w-7xl mx-auto w-full',
    full: 'px-4 md:px-6 w-full mx-auto' // Full width with padding
  };

  return (
    <section 
      className={sectionStyles}
      {...rest}
    >
      {withContainer ? (
        <div className={containerStyles[containerSize]}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export default Section; 