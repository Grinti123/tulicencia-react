import React, { useEffect } from 'react';

/**
 * Reusable DotLottiePlayer component
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Source URL for the Lottie animation
 * @param {boolean} [props.autoplay=true] - Whether to autoplay the animation
 * @param {boolean} [props.loop=true] - Whether to loop the animation
 * @param {string} [props.background='transparent'] - Background color
 * @param {string} [props.speed='1'] - Animation speed
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.style] - Additional inline styles
 */
const DotLottiePlayer = ({
  src,
  autoplay = true,
  loop = true,
  background = 'transparent',
  speed = '1',
  className = '',
  style = {}
}) => {
  useEffect(() => {
    // Initialize dotLottie player when component mounts
    const loadDotLottie = async () => {
      if (typeof window !== 'undefined') {
        // Check if dotLottie script is already loaded
        if (!document.querySelector('script[src*="dotlottie-player"]')) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js';
          script.async = true;
          document.body.appendChild(script);
        }
      }
    };

    loadDotLottie();
  }, []);

  return (
    <dotlottie-player
      src={src}
      background={background}
      speed={speed}
      loop={loop ? '' : null}
      autoplay={autoplay ? '' : null}
      style={{ width: '100%', height: '100%', ...style }}
      className={className}
    />
  );
};

export default DotLottiePlayer; 