import React, { useEffect, useRef } from 'react';

/**
 * FadeIn component that animates elements when they enter the viewport
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Elements to animate
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.rootMargin='50px'] - Root margin for Intersection Observer
 * @param {number} [props.threshold=0.1] - Threshold for Intersection Observer
 * @param {string} [props.duration='0.8s'] - Animation duration
 * @param {string} [props.distance='50px'] - Initial translation distance
 */
const FadeIn = ({
  children,
  className = '',
  rootMargin = '50px',
  threshold = 0.1,
  duration = '0.8s',
  distance = '50px'
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    
    if (!currentRef) return;

    // Add initial styling
    currentRef.style.opacity = '0';
    currentRef.style.transform = `translateY(${distance})`;
    currentRef.style.transition = `opacity ${duration} ease-out, transform ${duration} ease-out`;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentRef.style.opacity = '1';
            currentRef.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin, threshold, duration, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default FadeIn; 